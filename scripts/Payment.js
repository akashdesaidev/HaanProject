
document.getElementById("payButton").onclick = function (e) {

  var name = $("#name").val();
  var email = $("#email").val();
  var address = $("#address").val();
  var city = $("#city").val();
  var state = $("#state").val();
  var zip = $("#zip").val();
  var country = $("#country").val();
  var amount = $("#amount").val();
  var currency = $("#currency").val();

  // Validate form inputs
  if (!name || !email || !address || !city || !state || !zip || !country) {
    $("#errorText").text("Please fill in all fields.");
    return;
  } else {
    let payable = localStorage.getItem("TotalAmount") * 100 || 10000;
var options = {
  key: "rzp_test_hsSuMKzjGVmfGi", // Replace with your Razorpay API key
  amount: payable,
  currency: "INR",
  name: "HAAN",
  description: "Payment for Products",
  // Order ID generated from the server
  handler: function (response) {
    // Payment successful callback
    // alert(
        
    //   "Payment successful. Transaction ID: " + response.razorpay_payment_id
    // );


    Swal.fire({
      title: "Payment successful. Transaction ID: "  + response.razorpay_payment_id,
      confirmButtonColor: 'black',
      showClass: {
        popup: 'animate_animated animate_fadeInDown'
      },
      hideClass: {
        popup: 'animate_animated animate_fadeOutUp'
      }
    })
    window.location.href = "thankyou.html"; // Replace with your thank you page URL
  },
  prefill: {
    name: name,
    email: email,
    contact: "",
  },
};

var rzp1 = new Razorpay(options);
    rzp1.open();
  }
  e.preventDefault();
};
// var options = {
//     key: "rzp_test_hsSuMKzjGVmfGi", // Replace with your Razorpay API key
//     amount: 1000,
//     currency: "INR",
//     name: "HAAN",
//     description: "Payment for Products",
//      // Order ID generated from the server
//     handler: function (response) {
//         // Payment successful callback
//         alert("Payment successful. Transaction ID: " + response.razorpay_payment_id);
//         window.location.href = "/thankyou"; // Replace with your thank you page URL
//     },
//     prefill: {
//         name: name,
//         email: email,
//         contact: ""
//     }
// };
// var rzp1 = new Razorpay(options);
// document.getElementById('payButton').onclick = function(e){
//     rzp1.open();
//     e.preventDefault();
// }
