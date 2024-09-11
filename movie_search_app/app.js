let input=document.querySelector('input');
let btn=document.querySelector('button');
let list=document.querySelector('#list');

// button click karne pe event hoga and ek function chalega
// search ke text ke access karne ke liye input.innerText nhi chalega 
//we need to use input.value

//btn press karke search karna
btn.addEventListener('click', function (){
   let searchText = input.value;
   fetchdata(searchText);      //jo bhi return karega ousse data me store kar lia 
   
   //function me pass karenge search data taki vo add ho sake api ke last me   
   input.value='';            //search karne ke bad value hat jaye
})

//api call karna and show karna
function fetchdata(searchText){
   axios.get(`https://api.tvmaze.com/search/shows?q=${searchText}`)     //backticks used taki evaluation ho jaye
   .then(function(response){
      console.log(response.data);
      manipulatedom(response.data); 
   })
}

//dom change karega cheeze
function manipulatedom(datas){    //datas ke andar hai array

   //remove already present movies
   while(list.firstChild){
      list.firstChild.remove();
   }

   //add
   for (let data of datas){
      let figure=document.createElement('figure');

      if (data.show.image){           //ous data me image hui toh
         figure.innerHTML=`
         <img src="${data.show.image.original}"/>
         <h2>${data.show.name}</h2>
         <p>${data.show.summary ? data.show.summary : 'No summary available'}</p>
         `;
         list.appendChild(figure);
      }
   }
}