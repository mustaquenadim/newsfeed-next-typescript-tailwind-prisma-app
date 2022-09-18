import { Prisma } from '@prisma/client';
import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { config } from '../config';
import prisma from '../lib/prisma';
import { fetcher } from '../utils/request';

const Home: NextPage = ({ initialNews }) => {
	const [news, setNews] =
		useState<Prisma.NewsUncheckedCreateInput[]>(initialNews);

	useEffect(() => {
		const options = {
			method: 'GET',
			url: `${config.apiUrl}/news`,
			params: { companyname: 'Apple Inc.' },
			headers: {
				'X-RapidAPI-Key': config.rapidApiKey,
				'X-RapidAPI-Host': config.rapidApiHost,
			},
		};

		axios
			.request(options)
			.then(async (response) => {
				console.log('1st response______', response.data[0]);

				const body: Prisma.NewsCreateInput = {
					requestId: response.data[0].request_id,
					companyName: response.data[0].companyname,
					title: response.data[0].title,
					url: response.data[0].url,
					insider: response.data[0].insider,
					outsider: response.data[0].outsider,
					ceo: response.data[0].ceo,
					date: response.data[0].date,
				};

				// axios
				// 	.post(`${window.location.origin}/api/create`, response.data[0])
				// 	.then((res) => {
				// 		res.json();
				// 		console.log('2nd response_____', res);
				// 		setNews(...news, body);
				// 	})
				// 	.catch((err) => console.error(err));
				console.log('body_____', body);
				await fetcher('/api/create', { news: body });
				await setNews(...news, body);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, [news]);

	return (
		<>
			<Head>
				<title>Home Page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="container mx-auto">
				{/* selection form */}
				<div className="grid grid-cols-3 gap-7">
					<label className="block">
						<span className="text-gray-700">What type of event is it?</span>
						<select className="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
							<option>Corporate event</option>
							<option>Wedding</option>
							<option>Birthday</option>
							<option>Other</option>
						</select>
					</label>

					<label className="block">
						<span className="text-gray-700">When is your event?</span>
						<input
							type="date"
							className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">What type of event is it?</span>
						<select className="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
							<option>Corporate event</option>
							<option>Wedding</option>
							<option>Birthday</option>
							<option>Other</option>
						</select>
					</label>
				</div>
				{/* end selection form */}

				{/* news list */}
				<div className="mt-7">
					<div className="p-4 bg-gray-100 rounded-lg">
						<div>News | Tuesday, September 6th 2022</div>
						<div>
							Brazil orders Apple to suspend iPhone sales without charger
						</div>
						<a href="https://www.reuters.com">https://www.reuters.com</a>
					</div>
				</div>
				{/* end news list */}
			</div>
		</>
	);
};

export default Home;

export async function getServerSideProps() {
	const news: Prisma.NewsUncheckedCreateInput[] = await prisma.news.findMany();
	return {
		props: { initialNews: news },
	};
}
