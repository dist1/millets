import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const statesAndDistricts = {
    "Andhra Pradesh": [
        "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool",
        "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari",
        "YSR Kadapa"
    ],
    "Arunachal Pradesh": [
        "Anjaw", "Changlang", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey",
        "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri",
        "Namsai", "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Dibang Valley",
        "Upper Siang", "Upper Subansiri"
    ],
    "Assam": [
        "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang",
        "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai",
        "Jorhat", "Kamrup Metropolitan", "Kamrup Rural", "Karbi Anglong", "Karimganj", "Kokrajhar",
        "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar",
        "Tinsukia", "Udalguri", "West Karbi Anglong"
    ],
    "Bihar": [
        "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar",
        "Darbhanga", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria",
        "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda",
        "Nawada", "Pashchim Champaran", "Patna", "Purbi Champaran", "Purnia", "Rohtas", "Saharsa",
        "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali"
    ],
    "Chhattisgarh": [
        "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada",
        "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham",
        "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh",
        "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"
    ],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": [
        "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad",
        "Chhota Udaipur", "Dahod", "Devbhumi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar",
        "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari",
        "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar",
        "Tapi", "Vadodara", "Valsad"
    ],
    "Haryana": [
        "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar",
        "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula",
        "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
    ],
    "Himachal Pradesh": [
        "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi",
        "Shimla", "Sirmaur", "Solan", "Una"
    ],
    "Jharkhand": [
        "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih",
        "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga",
        "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega",
        "West Singhbhum"
    ],
    "Karnataka": [
        "Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belagavi", "Ballari", "Bidar", "Chamarajanagar",
        "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad",
        "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore",
        "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayanagara",
        "Vijayapura", "Yadgir"
    ],
    "Kerala": [
        "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode",
        "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
    ],
    "Madhya Pradesh": [
        "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind",
        "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar",
        "Dindori", "Guna", "Gwalior", "Harda", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa",
        "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Niwari", "Panna",
        "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol",
        "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umariya",
        "Vidisha"
    ],
    "Maharashtra": [
        "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna",
        "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar",
        "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli",
        "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
    ],
    "Manipur": [
        "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching",
        "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal",
        "Ukhrul"
    ],
    "Meghalaya": [
        "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi",
        "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills",
        "West Jaintia Hills", "West Khasi Hills"
    ],
    "Mizoram": [
        "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit",
        "Saiha", "Saitual", "Serchhip"
    ],
    "Nagaland": [
        "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Niuland", "Noklak", "Peren",
        "Phek", "Shamator", "Tseminyu", "Tuensang", "Wokha", "Zunheboto"
    ],
    "Odisha": [
        "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal",
        "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal",
        "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur",
        "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh"
    ],
    "Punjab": [
        "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur",
        "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa",
        "Moga", "Mohali", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar",
        "Tarn Taran"
    ],
    "Rajasthan": [
        "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi",
        "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer",
        "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh",
        "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
    ],
    "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    "Tamil Nadu": [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul",
        "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai",
        "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
        "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni",
        "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur",
        "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
    ],
    "Telangana": [
        "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally",
        "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem", "Mahabubabad",
        "Mahbubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda",
        "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy",
        "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban",
        "Yadadri Bhuvanagiri"
    ],
    "Tripura": [
        "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti",
        "West Tripura"
    ],
    "Uttar Pradesh": [
        "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh",
        "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti",
        "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah",
        "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur",
        "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi",
        "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar",
        "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut",
        "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli",
        "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti",
        "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
    ],
    "Uttarakhand": [
        "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal",
        "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
    ],
    "West Bengal": [
        "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly",
        "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia",
        "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur",
        "Purulia", "South 24 Parganas", "Uttar Dinajpur"
    ],
    "Andaman and Nicobar Islands": [
        "North and Middle Andaman", "South Andaman", "Nicobar"
    ],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": [
        "Dadra and Nagar Haveli", "Daman", "Diu"
    ],
    "Delhi": [
        "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi",
        "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi",
        "West Delhi"
    ],
    "Jammu and Kashmir": [
        "Anantnag", "Bandipore", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua",
        "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi",
        "Samba", "Shopian", "Srinagar", "Udhampur"
    ],
    "Ladakh": [
        "Kargil", "Leh"
    ],
    "Lakshadweep": [
        "Lakshadweep"
    ],
    "Puducherry": [
        "Karaikal", "Mahe", "Puducherry", "Yanam"
    ]
};

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("Username");
    if (storedUsername) {
      console.log("User already logged in, redirecting to home...");
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    console.log("Updated Username:", username);
    console.log("Updated Password:", password);
  }, [username, password]);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
    setState("");
    setDistrict("");
    setErrorMessage("");
    console.log("Toggled form:", isLogin ? "Switched to Register" : "Switched to Login");
  };

  const submitForm = async () => {
    console.log("Submitting form...");
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("State:", state);
    console.log("District:", district);

    // 🛑 Validate fields before making API call
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("All fields are required.");
      console.error("Validation Error: Missing username or password.");
      return;
    }

    if (!isLogin && (state.trim() === "" || district.trim() === "")) {
      setErrorMessage("State and District are required for registration.");
      console.error("Validation Error: Missing state or district.");
      return;
    }

    const endpoint = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const bodyData = isLogin
      ? { username, password }
      : { username, password, state, district };

    try {
      console.log("Sending API request to:", endpoint);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok && result.token) {
        console.log("Login/Register successful, storing token...");
        localStorage.setItem("username", username);
        localStorage.setItem("token", result.token);
        navigate("/home");
      } else {
        setErrorMessage(result.message || "Invalid username or password.");
        console.error("API Error:", result.message);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF]">
      <header className="flex flex-col items-center justify-center border-b px-8 py-4">
        <h2 className="text-[#1C160C] text-xl font-bold">Millets</h2>
      </header>
      <div className="flex h-full justify-center py-5 px-20">
        <div className="w-[400px] py-5 flex flex-col">
          <h1 className="text-[#1C160C] text-lg font-bold text-center pb-2">
            {isLogin ? "Sign in or create an account" : "Register or log in to your account"}
          </h1>

          <label className="flex flex-col py-2">
            <p className="text-sm font-medium">Username</p>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                console.log("Updating Username:", e.target.value);
                setUsername(e.target.value);
              }}
              className="border rounded-lg p-2"
            />
          </label>

          <label className="flex flex-col py-2">
            <p className="text-sm font-medium">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                console.log("Updating Password:", e.target.value);
                setPassword(e.target.value);
              }}
              className="border rounded-lg p-2"
            />
          </label>

          {!isLogin && (
            <>
              <label className="flex flex-col py-2">
                <p className="text-sm font-medium">State</p>
                <select
                  value={state}
                  onChange={(e) => {
                    console.log("Updating State:", e.target.value);
                    setState(e.target.value);
                    setDistrict(""); // Reset district when state changes
                  }}
                  className="border rounded-lg p-2"
                >
                  <option value="">Select State</option>
                  {Object.keys(statesAndDistricts).map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col py-2">
                <p className="text-sm font-medium">District</p>
                <select
                  value={district}
                  onChange={(e) => {
                    console.log("Updating District:", e.target.value);
                    setDistrict(e.target.value);
                  }}
                  className="border rounded-lg p-2"
                  disabled={!state}
                >
                  <option value="">Select District</option>
                  {state && statesAndDistricts[state].map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </label>
            </>
          )}

          <button onClick={submitForm} className="bg-[#019863] text-white font-bold py-2 px-4 rounded mt-4">
            {isLogin ? "Sign In" : "Register"}
          </button>
          {errorMessage && <p className="text-red-600 text-sm pt-2">{errorMessage}</p>}

          <p className="text-sm text-[#A18249] mt-3 cursor-pointer" onClick={toggleAuth}>
            {isLogin ? "New user? Register here" : "Already have an account? Sign in"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth