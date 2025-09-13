import { useGetProductsQuery } from "@/features/ProductsCatalog/productsAPI";

function App() {

   const { data, error, isLoading } = useGetProductsQuery();
   console.log('isLoading', isLoading)
   console.log('error', error)
   console.log('data', data)

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products.</p>;

  return (
      <div className="app">
        APP Component
      </div>
  )
}

export default App
