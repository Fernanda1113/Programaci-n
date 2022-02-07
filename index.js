document.addEventListener("submit", (event) => {
    event.preventDefault();
  
    let form = document.querySelector("#productForm");
    let data = new FormData(form);
  
    fetch("http://localhost:8080/api/products", {
      method: "POST",
      body: data
    })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        Swal.fire({
          title: "éxito",
          text: json.message,
          icon: "success",
          timer: 1500
        }).then((result) => {
          location.href = "http://localhost:8080/";
        });
      });
  });