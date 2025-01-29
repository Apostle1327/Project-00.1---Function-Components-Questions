// 1.	Problem: Create a class component that displays a list of products and allows the user to search for products by name.

class ProductsList {
  constructor() {
    this.productList = {
      products: [
        { id: 1, name: "Component 1" },
        { id: 2, name: "Component 2" },
        { id: 3, name: "Component 3" },
        { id: 4, name: "Component 4" },
        { id: 5, name: "Component 5" },
      ],
      searchQuery: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.productList.searchQuery = e.target.value;
    this.render();
  }

  filterProducts() {
    const { searchQuery, products } = this.productList;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  render() {
    let container = document.getElementById("product-list-container");

    if (!container) {
      container = document.createElement("div");
      container.id = "product-list-container";
      document.body.appendChild(container);

      const title = document.createElement("h1");
      title.textContent = "Product List";
      title.style.fontFamily = "Modern No. 20";
      title.style.fontSize = "20px";
      title.style.fontWeight = "bold";
      title.style.marginBottom = "10px";
      container.appendChild(title);

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Enter The Search Query!";
      input.style.padding = "10px";
      input.style.border = "1px solid #ccc";
      input.style.borderRadius = "5px";
      input.style.width = "40%";
      input.style.marginBottom = "10px";
      input.onkeyup = this.handleSearch;
      input.id = "search-input";
      container.appendChild(input);
    }

    const inputField = document.getElementById("search-input");
    inputField.value = this.productList.searchQuery;

    let ul = container.querySelector("ul");
    if (!ul) {
      ul = document.createElement("ul");
      ul.style.listStyle = "disc";
      ul.style.paddingLeft = "20px";
      ul.style.fontFamily = "sans-serif";
      container.appendChild(ul);
    }
    ul.innerHTML = "";

    const filteredProducts = this.filterProducts();
    if (filteredProducts.length > 0) {
      filteredProducts.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = product.name;
        li.style.marginBottom = "5px";
        ul.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "No Data Found";
      li.style.color = "#888";
      ul.appendChild(li);
    }
  }
}

const productList = new ProductsList();
productList.render();
