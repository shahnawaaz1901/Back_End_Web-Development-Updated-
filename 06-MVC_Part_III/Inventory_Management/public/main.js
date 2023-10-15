const deleteProduct = (id) => {
  const result = confirm("Are You Sure You Want to Delete this Product..?");
  if (result) {
    // *Call Our Delete Product API
    console.log(`/delete-product/${id}`);
    fetch(`/delete-product/${id}`, {
      method: "POST",
    })
      .then((response) => {
        //! Fetch Function Returns Promise
        if (response.ok) {
          // ?Reload the Page
          window.alert("Deleted Successfully !!");
          location.reload();
        }
      })
      .catch((error) => location.reload());
  }
};
