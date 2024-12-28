console.log("Products frontend javascript file");

$(function () {
    $(".product-collection").on("change", () => {
        const selectedValue = $(".product-collection").val();
        if (selectedValue === "SHOES") { //Drink bulganda product-collection yashiriladi shoes-size kursatiladi
            $("#product-collection").hide() // 
            $("#shoes-size").show()
        } else { // boshqa hollarda shoes-size yashiriladi product-collection kursatiladi
            $("#shoes-size").hide();
            $("#product-collection").show();
        }
    })

    $("#process-btn").on("click", () => { //newproduct btn bosilganda shop-container ichidagi mantiq kursatiladi
        $(".shop-container").slideToggle(500);
        $("#process-btn").css("display", "none");
    })

    $("#cancel-btn").on("click", () => { // cancel qilib beradi
        $(".shop-container").slideToggle(100);
        $("#process-btn").css("display", "flex");
    })
    
    // Product status o'zgartirish mantig'i
    $(".new-product-status").on("change", async function (e) { 
        const id = e.target.id;
        const productStatus = $(`#${id}.new-product-status`).val();
        console.log("id:", id);
        console.log("productStatus:", productStatus);
    
        try {
            const response = await axios.post(`/admin/product/${id}`, {
                productStatus: productStatus,
            });
    
            console.log("response:", response);
            const result = response.data;
            if (result.data) {
                console.log("Product updated!");
                $(`.new-product-status`).blur();
            } else alert("Product update failed!");
        } catch (err) {
            console.log(err);
            alert("Product update failed!");
        }
    });
    
}) 

// Form Validation mantig'i
function validateForm() {
    const productName = $(".product-name").val();
    const productPrice = $(".product-price").val();
    const productLeftCount = $(".product-left-count").val();
    const productCollection = $(".product-collection").val();
    const productDesc = $(".product-desc").val();
    const productStatus = $(".product-status").val();

    if (
        productName === "" ||
        productPrice === "" ||
        productLeftCount === "" ||
        productCollection === "" ||
        productDesc === "" ||
        productStatus === ""
    ) {
        alert("Please insert all details!");
        return false;
    } else return true;
}

// Rasm Yuklash mantig'i
function previewFileHandler(input, order) { 
    const imgClassName = input.className;
    console.log("input: ", input)
    console.log("imgClassName: ", imgClassName)

    const file = $(`.${imgClassName}`).get(0).files[0];
    const fileType = file['type'];
    const validImageType = ["image/jpg", "image/jpeg", "image/png"];

    if (!validImageType.includes(fileType)) {
        alert("Please insert only jpeg, jpg and png!");
    } else {
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {$(`#image-section-${order}`).attr("src", reader.result)} // tegishli <img> elementiga (#image-section-${order}) src atributi orqali rasm URL’i o‘rnatiladi.
            reader.readAsDataURL(file) //faylning ma'lumotlari URL sifatida o‘qiladi.

        }
    }
}