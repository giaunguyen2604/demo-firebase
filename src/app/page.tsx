import TodoContainer from '@/components/TodoContainer';
import { clientConfig, serverConfig } from '@/configs';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';

export default async function Home() {
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		return <></>;
	}

	return (
		<main className='p-5 max-w-[600px] mx-auto'>
			<TodoContainer />
		</main>
	);
}
