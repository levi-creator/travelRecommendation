// Task 6: Fetch travel data
async function fetchData() {
    try {
      const response = await fetch('travel_recommendation_api.json');
      const data = await response.json();
      console.log("API Data:", data); // Check in console if data loads correctly
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
// Task 7: Search functionality
async function searchRecommendations() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ""; // Clear previous results
  
    const data = await fetchData();
  
    let recommendations = [];
  
    if (input.includes("beach")) {
        recommendations = data.beaches;
      } else if (input.includes("temple")) {
        recommendations = data.temples;
      } else if (input.includes("country")) {
        // Flatten countries → cities
        recommendations = data.countries.flatMap(country => country.cities);
      }
      
  
    if (recommendations.length > 0) {
      displayResults(recommendations);
    } else {
      resultsDiv.innerHTML = "<p>No recommendations found. Try 'beach', 'temple', or 'country'.</p>";
    }
  }
// Task 8: Display recommendations
function displayResults(recommendations) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = "grid";
    resultsDiv.style.gridTemplateColumns = "repeat(2, 1fr)";
    resultsDiv.style.gap = "20px";
  
    recommendations.forEach(place => {
      const card = document.createElement("div");
      card.innerHTML = `
        <h3>${place.name}</h3>
        <img src="${place.imageUrl}" alt="${place.name}" style="width:100%; height:200px; object-fit:cover;">
        <p>${place.description}</p>
      `;
      resultsDiv.appendChild(card);
    });
  }
// Task 9: Clear results
function clearResults() {
    document.getElementById('searchInput').value = "";
    document.getElementById('results').innerHTML = "";
  }



  document.getElementById("btnSearch").addEventListener("click", searchRecommendations);
  document.getElementById("btnClear").addEventListener("click", clearResults);
  

