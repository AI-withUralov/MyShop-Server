console.log("Users frontend javascript file");
// Member Status o'zgarganda, o'zgarishlarni serverga yuborish mantig'i
$(function () {
    $(".member-status").on("change", function (e) {
      const id = e.target.id;
      console.log("id:", id);
  
      const memberStatus = $(`#${id}.member-status`).val();// mana shu id dagi elementni tanlangan qiymatini(Status) oladi ==> ex: BLOCK
      console.log("memberStatus:", memberStatus);
  
      axios
        .post("/admin/user/edit", { // serverga o'zgargan status yuboriladi
          _id: id,
          memberStatus: memberStatus,
        })
        .then((response) => {
          console.log("response:", response);
          const result = response.data; // natija qaytib keladi
          console.log("result:", result);
  
          if (result.data) {
            console.log("User updated!");
            $(".member-status").blur(); // user apdate bulib ---> blur() metodi inputni fokusdan chiqarish uchun ishlatilgan
          } else {
            alert("User update failed!");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("User update failed!");
        });
    });
  });
  