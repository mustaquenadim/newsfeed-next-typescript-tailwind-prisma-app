import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const { news } = req.body;
		// const news: Prisma.UserCreateInput = JSON.parse(req.body);
		const savedNews = await prisma.news.create({
			data: news,
		});
		res.status(200).json(savedNews);
	} catch (error) {
		res.status(400).json({ message: 'Something went wrong' });
	}
};
