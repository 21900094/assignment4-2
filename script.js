const baseUrl = 'https://67296e3b6d5fa4901b6d1e4b.mockapi.io/products';

// Function to fetch and display products
async function getProducts() {
    const response = await fetch(baseUrl);
    const products = await response.json();

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        productList.innerHTML += `
            <div class="card my-2">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                    <p class="card-text"><strong>Price:</strong> ${product.price} - <strong>Discount:</strong> ${product.discount}%</p>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Delete</button>
                    <button class="btn btn-warning btn-sm" onclick="openUpdateModal(${product.id})">Update</button>
                </div>
            </div>
        `;
    });
}

// Function to add a new product
async function addProduct(event) {
    event.preventDefault();

    const product = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        price: parseFloat(document.getElementById('price').value),
        discount: parseInt(document.getElementById('discount').value)
    };

    await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });

    document.getElementById('productForm').reset();
    getProducts(); // Refresh the product list
}

// Function to open the Update Product modal
async function openUpdateModal(id) {
    const response = await fetch(`${baseUrl}/${id}`);
    const product = await response.json();

    document.getElementById('updateId').value = product.id;
    document.getElementById('updateName').value = product.name;
    document.getElementById('updateDescription').value = product.description;
    document.getElementById('updateCategory').value = product.category;
    document.getElementById('updatePrice').value = product.price;
    document.getElementById('updateDiscount').value = product.discount;

    const updateModal = new bootstrap.Modal(document.getElementById('updateProductModal'));
    updateModal.show();
}

// Function to update an existing product
async function updateProduct(event) {
    event.preventDefault();

    const id = document.getElementById('updateId').value;
    const updatedData = {
        name: document.getElementById('updateName').value,
        description: document.getElementById('updateDescription').value,
        category: document.getElementById('updateCategory').value,
        price: parseFloat(document.getElementById('updatePrice').value),
        discount: parseInt(document.getElementById('updateDiscount').value)
    };

    await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });

    getProducts(); // Refresh the product list
    const updateModal = bootstrap.Modal.getInstance(document.getElementById('updateProductModal'));
    updateModal.hide(); // Hide the modal after updating
}

// Function to delete a product
async function deleteProduct(id) {
    await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    });

    getProducts(); // Refresh the product list
}

// Load products when the page loads
getProducts();
