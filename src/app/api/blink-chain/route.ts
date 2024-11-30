import {
  createPostResponse,
  createActionHeaders,
  type ActionPostResponse,
  type ActionGetResponse,
  type ActionPostRequest,
} from '@solana/actions';
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
 
const keypair = getKeypairFromEnvironment("SECRET_KEY");

const senderSecretKey_ = keypair.secretKey;
const headers = createActionHeaders();
const icon_ = 'https://i.ibb.co/Jmth0hm/educhainscholar.png';

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);

    const baseHref = new URL(
      "/api/blink-chain?",
      requestUrl.origin,
    ).toString();
    const payload: ActionGetResponse = {
      type: 'action',
      title: 'EduChain Scholarships',
      icon: icon_,
      description:
        'For kids that live in the future, give them their future.',
      label: 'Transfer', // this value will be ignored since links.actions exists
      links: {
        actions: [
          {
            type: "transaction",
            label: 'Send', // button text
            href: `${baseHref}receiverWallet={receiverWallet}`, // this href will have a text input
            parameters: [
              {
                name: 'receiverWallet', // parameter name in the href above
                label: 'Receiver Wallet', // placeholder of the text input
                required: true,
              },
            ],
          }
        ],
      },
    };

    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let message = 'An unknown error occurred';
    if (typeof err === 'string') message = err;
    return new Response(message, {
      status: 400,
      headers,
    });
  }
};

// DO NOT FORGET TO INCLUDE THE OPTIONS HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async (req: Request) => {
  return new Response(null, { headers });
};

export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const {toPubkey } = validatedQueryParams(requestUrl);
    const body: ActionPostRequest = await req.json();

    // validate the client provided input
    let account: PublicKey;
    const senderSecretKey = Uint8Array.from(senderSecretKey_);
    const senderWallet = Keypair.fromSecretKey(senderSecretKey);
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return new Response('Invalid "account" provided', {
        status: 400,
        headers,
      });
    }
    // const connection = new Connection(
    //   // biome-ignore lint/style/noNonNullAssertion: <explanation>
    //   process.env.SOLANA_RPC! || clusterApiUrl('mainnet-beta'),
    // );

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // ensure the receiving account will be rent exempt
    const minimumBalance = await connection.getMinimumBalanceForRentExemption(
      0, // note: simple accounts that just store native SOL have 0 bytes of data
    );
    if (0.001 * LAMPORTS_PER_SOL < minimumBalance) {
      throw `account may not be rent exempt: ${toPubkey.toBase58()}`;
    }

    const solphi: PublicKey = new PublicKey(
      '79AVUqNfDDHRVNTCvb37bEhv8mi9GrUB3hE1nCsqscxV',
    );
    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: solphi,
      lamports: 0.0003 * LAMPORTS_PER_SOL, // reklam ücreti (kesinti, komisyon)
    });


    const transferSolInstruction2 = SystemProgram.transfer({
      fromPubkey: senderWallet.publicKey,
      toPubkey: toPubkey,
      lamports: 0.0031 * LAMPORTS_PER_SOL, // kullanıcının claim ettiği tutar
    });

    const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

    const transaction = new Transaction({
      feePayer: senderWallet.publicKey,
      blockhash,
      lastValidBlockHeight,
    }).add(transferSolInstruction,transferSolInstruction2);

    (async () => {
      try {
        const signature = await sendAndConfirmTransaction(
          connection,
          transaction,
          [senderWallet]
        );
        console.log('Transaction confirmed with signature', signature);
      } catch (error) {
        console.error('Transaction failed', error);
      }
    })();

    await new Promise(resolve => setTimeout(resolve, 1000));

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message: "Check your wallet for the transaction",
      },
      // note: no additional signers are needed
      // signers: [],
    });
    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let message = 'An unknown error occurred';
    if (typeof err === 'string') message = err;
    return new Response(message, {
      status: 400,
      headers,
    });
  }
};


function validatedQueryParams(requestUrl: URL) {
  let toPubkey: PublicKey = new PublicKey(
    '79AVUqNfDDHRVNTCvb37bEhv8mi9GrUB3hE1nCsqscxV', // reklam verenden alınan komisyonun gidecği cüzdan adresi
  );
  // icon_ = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/640px-Bitcoin.svg.png';

  try {
    const receiverWallet = requestUrl.searchParams.get('receiverWallet');
    if (receiverWallet) {
      toPubkey = new PublicKey(receiverWallet);
    }
  } catch (err) {
    throw 'Invalid input query parameter: receiverWallet';
  }

  return {
    toPubkey,
  };
}