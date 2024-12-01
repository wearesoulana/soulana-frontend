import {
	createPostResponse,
	createActionHeaders,
	type ActionPostResponse,
	type ActionGetResponse,
	type LinkedAction,
} from "@solana/actions";
import {
	clusterApiUrl,
	Connection,
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
} from "@solana/web3.js";

import "dotenv/config";

const headers = createActionHeaders();

// Add this interface at the top of the file with other imports
interface DonationRequest {
	id: number;
	account: string;
	amount: string;
	receiverWallet: string;
}

interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	target: string;
	raised: string;
	minDonation: number;
	wallet: PublicKey;
	actions: {
		type: LinkedAction["type"];
		label: string;
		href: (baseHref: string, id: number) => string;
		parameters: {
			name: string;
			label: string;
			required: boolean;
		}[];
	}[];
}

const projects: Project[] = [
	{
		id: 1,
		title: "EduChain Scholarships",
		description:
			"Scholarship support for students seeking blockchain technology education.",
		image: "https://i.ibb.co/x81s9mN/educhainscholar.png",
		target: "100 SOL",
		raised: "45 SOL",
		minDonation: 0.001,
		wallet: new PublicKey("F1rstn82GYYuWVPYBg7YKUZ2fZskDFg27ocXBx88pcgW"),
		actions: [
			{
				type: "transaction" as const,
				label: "Send",
				href: (baseHref: string, id: number) =>
					`${baseHref}id=${id}&amount={amount}`,
				parameters: [
					{
						name: "amount",
						label: "Amount",
						required: true,
					},
				],
			},
		],
	},
	{
		id: 2,
		title: "GreenSol Reforestation",
		description: "Support reforestation efforts to combat climate change.",
		image: "https://i.ibb.co/7GHVvwP/greensolrefores.png",
		target: "200 SOL",
		raised: "45 SOL",
		minDonation: 0.001,
		wallet: new PublicKey("F1rstn82GYYuWVPYBg7YKUZ2fZskDFg27ocXBx88pcgW"),
		actions: [
			{
				type: "transaction" as const,
				label: "Send",
				href: (baseHref: string, id: number) =>
					`${baseHref}id=${id}&amount={amount}`,
				parameters: [
					{
						name: "amount",
						label: "Amount",
						required: true,
					},
				],
			},
		],
	},
];

export const GET = async (req: Request) => {
	try {
		const requestUrl = new URL(req.url);
		const projectId = requestUrl.searchParams.get("id");

		// Find the project by ID
		const project = projects.find((p) => p.id === Number(projectId));
		if (!project) {
			throw new Error("Invalid project ID");
		}

		const baseHref = new URL("/api/blink-chain?", requestUrl.origin).toString();
		const payload: ActionGetResponse = {
			type: "action",
			title: project.title,
			icon: project.image,
			description: project.description,
			label: "Transfer",
			links: {
				actions: project.actions.map(
					(action) =>
						({
							type: action.type,
							label: action.label,
							href: action.href(baseHref, project.id),
							parameters: action.parameters,
						}) as LinkedAction,
				),
			},
		};

		return Response.json(payload, {
			headers,
		});
	} catch (err) {
		console.log(err);
		let message = "An unknown error occurred";
		if (typeof err === "string") message = err;
		return new Response(message, {
			status: 400,
			headers,
		});
	}
};

// DO NOT FORGET TO INCLUDE THE OPTIONS HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async () => {
	return new Response(null, { headers });
};

export const POST = async (req: Request) => {
	try {
		const body = (await req.json()) as DonationRequest;

		// Validate the client provided input
		let account: PublicKey;

		try {
			account = new PublicKey(body.account);
		} catch {
			return new Response('Invalid "account" provided', {
				status: 400,
				headers,
			});
		}

		// Find the project by ID
		const project = projects.find((p) => p.id === body.id);
		if (!project) {
			return new Response("Invalid project ID", {
				status: 400,
				headers,
			});
		}

		// Validate donation amount
		const donationAmount = Number.parseFloat(body.amount);
		if (Number.isNaN(donationAmount)) {
			return new Response("Invalid donation amount", {
				status: 400,
				headers,
			});
		}

		// Check minimum donation amount
		if (donationAmount < project.minDonation) {
			return new Response(
				`Donation amount must be at least ${project.minDonation} SOL`,
				{
					status: 400,
					headers,
				},
			);
		}

		const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
		const donationLamports = donationAmount * LAMPORTS_PER_SOL;

		// Check if sender has enough balance
		const senderBalance = await connection.getBalance(account);
		if (senderBalance < donationLamports) {
			return new Response("Insufficient balance for donation", {
				status: 400,
				headers,
			});
		}

		// Create donation transaction
		const donationInstruction = SystemProgram.transfer({
			fromPubkey: account,
			toPubkey: project.wallet, // Use project wallet directly
			lamports: donationLamports,
		});

		// Get latest blockhash
		const { blockhash, lastValidBlockHeight } =
			await connection.getLatestBlockhash();

		// Create transaction
		const transaction = new Transaction({
			feePayer: account, // Set fee payer to sender
			blockhash,
			lastValidBlockHeight,
		}).add(donationInstruction);

		// Create response
		const payload: ActionPostResponse = await createPostResponse({
			fields: {
				type: "transaction",
				transaction,
				message: `Donating ${donationAmount} SOL to ${project.title}`,
			},
		});

		return Response.json(payload, {
			headers,
		});
	} catch (err) {
		console.log(err);
		let message = "An unknown error occurred";
		if (typeof err === "string") message = err;
		return new Response(message, {
			status: 400,
			headers,
		});
	}
};
