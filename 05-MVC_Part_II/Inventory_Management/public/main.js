/*
 * Because Confirmation Dialogue Box is Work on Front End
 */

const deleteProduct = (id) => {
    const result = confirm("Are You Sure You Want to Delete this Product..?");
    if(result){
        // *Call Our Delete Product API
        console.log(`/delete-product/${id}`);
        fetch(`/delete-product/${id}`,{
            method : "POST",
        }).then((response)=>{
            if(response.ok){
                console.log('Inside Response !!');
                location.reload();
            }
        })
    }
}