
async function testApi() {
  try {
    const res = await fetch('http://localhost:3000/api/products');
    const data = await res.json();
    console.log('API Response Sample:');
    if (data.allProducts && data.allProducts.length > 0) {
      data.allProducts.forEach(p => {
        console.log(`Name: ${p.name}`);
        console.log(`mainImage: "${p.mainImage}"`);
      });
    } else {
      console.log('No products found in API response');
    }
  } catch (err) {
    console.error('Error fetching API:', err.message);
  }
}

testApi();
