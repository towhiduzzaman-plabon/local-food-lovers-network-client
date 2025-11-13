import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';


const client = new QueryClient();
export default function QueryProvider({ children }) {
return (
<QueryClientProvider client={client}>
{children}
<Toaster position="top-center" />
</QueryClientProvider>
);
}