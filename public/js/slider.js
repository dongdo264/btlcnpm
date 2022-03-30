/*
var slideIndex = 1;
 showSlides(slideIndex);
function plusSlides(n) {
   showSlides(slideIndex += n);
 }
function currentSlide(n) {
   showSlides(slideIndex = n);
 }
function showSlides(n) {
   var i;
   var slides = document.getElementsByClassName("mySlides");
   var dots = document.getElementsByClassName("dot");
   if (n > slides.length) {slideIndex = 1}
   if (n < 1) {slideIndex = slides.length}
   for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
   }
   for (i = 0; i < dots.length; i++) {
       dots[i].className = dots[i].className.replace(" active", "");
   }
   slides[slideIndex-1].style.display = "block";
   dots[slideIndex-1].className += " active";
 } */
 var mainImg = document.getElementById('mainImg');
 var viewImg = document.getElementsByClassName('small-img');

 viewImg[0].onclick = function() {
   mainImg.src = viewImg[0].src;
 }
 viewImg[1].onclick = function() {
  mainImg.src = viewImg[1].src;
}
viewImg[2].onclick = function() {
  mainImg.src = viewImg[2].src;
}
viewImg[3].onclick = function() {
  mainImg.src = viewImg[3].src;
}


// function selectOption() {
//   var mySelect = document.getElementById('myselected');
//   var element = mySelect.value;
//   console.log(element);
//   if (element == "") {
//     mySelect.selectedIndex = 0;
//   } else if(element == "mostsale") {
//     mySelect.selectedIndex = 1;
//   } else if (element == "asc") {
//     mySelect.selectedIndex = 2;
//   } else if (element == "desc") {
//     mySelect.selectedIndex = 3;
//   }
// }