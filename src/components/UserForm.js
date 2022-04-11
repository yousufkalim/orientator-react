import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Checkbox, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Store, UpdateStore } from "../StoreContext";
import Grid from "@material-ui/core/Grid";
import veryExcited from "../assets/img/VeryExcited.png";
import arrowleft from "../assets/img/arrow2.png";
import scrollToTop from "../utils/ScrollTop";
import DatePicker from "react-datepicker";
import ConfirmationPopup from "./ConfirmationPopup";
import enGb from "date-fns/locale/fr";
import { registerLocale } from "react-datepicker";
import api from "../api";
import { Helmet } from "react-helmet";

let education = [
  "Quatrième",
  "Troisième",
  "Lycée",
  "Seconde Générale",
  "Première Générale",
  "Première STL",
  "Première STI2D",
  "Première STD2A",
  "Première STMG",
  "Première ST2S",
  "Première S2TMD",
  "Première STHR",
  "Première STAV",
  "Terminale Générale",
  "Terminale STL",
  "Terminale STI2D",
  "Terminale STD2A",
  "Terminale STMG",
  "Terminale ST2S",
  "Terminale S2TMD",
  "Terminale STHR",
  "Terminale STAV",
];

const days = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
let countries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Cote D'Ivoire", code: "CI" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Democratic People'S Republic of", code: "KP" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Lao People'S Democratic Republic", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia and Montenegro", code: "CS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];

const locale = {
  localize: {
    day: (n) => days[n],
    month: (n) => months[n],
  },
  formatLong: {
    date: () => "dd/MM/yyyy",
  },
};
let timeInterval;
const UserForm = ({ setStep, setActiveStep }) => {
  registerLocale("en-gb", enGb);
  // initialize ContextStore
  const updateStore = UpdateStore();
  const { institutes } = Store();

  let getSchoolData = async () => {
    let res = await api("get", "/institute");
    if (res) {
      updateStore({ institutes: res?.data?.institute });
    }
  };
  // initialize States
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    institute: "",
    address: "",
    education_level: "Classe",
    country: "France",
    customeAddress: "",
    phone: "",
    email: "",
    newsletter: false,
    accept_condition: false,
    accept_condition2: false,
  });
  // state for address options list
  const [values, setValues] = useState([]);
  const [confirmationOpen, SetconfirmationOpen] = useState(false);
  const [flagforSchool, setFlagforSchool] = useState(false);

  // state for address details
  const [addressValue, setAddressValue] = useState({
    lat: "",
    lng: "",
    city: "",
    postal_code: "",
    label: "",
    label2: "",
  });
  const [loading, setLoading] = useState(false);
  const [resendloading, setresendLoading] = useState(false);
  const [imgloading, setImgLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [otpbyemail, setOtpByemail] = useState(false);

  // Destructuring of UserForm State
  const {
    first_name,
    last_name,
    date_of_birth,
    institute,
    address,
    education_level,
    phone,
    email,
    newsletter,
    accept_condition,
    accept_condition2,
    country,
    customeAddress,
  } = formData;
  // Get institutes data from API
  useEffect(() => {
    scrollToTop();
    getSchoolData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const useStyles = makeStyles({
    customTextField: {
      "& input::placeholder": {
        color: "white",
        "@media (max-width: 780px)": {
          paddingLeft: "-2px",
        },
      },
    },
    customTextFieldestablish: {
      "& input::placeholder": {
        color: "white",
        fontSize: "13px",
        "@media (max-width: 780px)": {
          fontSize: "12px",
          paddingLeft: "-2px",
        },
      },
    },
    option: {
      background: "#242635 ",
      color: "white",
      "&:hover": {
        backgroundColor: "#9198a5 !important",
      },
    },
    noOptions: {
      display: `${values.length <= 0 ? "none" : "inherit"}`,
      color: "white",
    },
    select: {
      background: "#242635",
      color: "#9198a5",
      "&:before": {
        borderColor: "red",
      },
      "&:after": {
        borderColor: "yellow",
      },
    },
  });
  const classes = useStyles();

  // onChange Function for Input Field
  const onChange = (e) => {
    if (
      e.target.name === "newsletter" ||
      e.target.name === "accept_condition" ||
      e.target.name === "accept_condition2"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      if (e.target.name === "education_level" && e.target.value === "") {
        setFormData({
          ...formData,
          institute: "",
          education_level: "",
        });
      } else
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    }
  };
  // onChange Function for Input Field
  const onChangeCountry = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlurSchools = () => {
    setFlagforSchool(!flagforSchool);
  };
  // onChange Function for Select institute
  const handleChangeSchool = (event, value) => {
    setFormData({ ...formData, institute: value?.name });
  };
  const handleChangecountry = (event, value) => {
    setFormData({ ...formData, country: value?.name });
    if (value.name == "France") {
      setAddressValue({
        ...addressValue,
        address: "",
        zip_code: "",
        lat: "",
        long: "",
        city: "",
      });
    }

    // setFormData({ ...formData, customeAddress: "" });
  };
  // function for Date select
  const onChangeDate = (date) => {
    setFormData({ ...formData, date_of_birth: date });
  };

  // Get All Address in drop down List from API
  const getAllAdress = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    delete axios.defaults.headers.common["x-auth-token"];

    let res = await axios.get(
      "https://api-adresse.data.gouv.fr/search/?q=" +
        e.target.value +
        "&type=housenumber&autocomplete=1",
      {
        withCredentials: false,
      }
    );

    if (localStorage.token) {
      axios.defaults.headers.common["x-auth-token"] = localStorage.token;
    }

    var addressToSet = []; // //debugger;
    for (var i = 0; i < res?.data?.features?.length; i++) {
      addressToSet.push({
        id: i,
        label: res?.data?.features[i].properties.label,
        label2: `${
          res?.data?.features[i].properties.label +
          "," +
          res?.data?.features[i].properties.context
        }`,
        city: res?.data?.features[i].properties.city,
        PostalCode: res?.data?.features[i].properties.postcode,
        lat: res?.data?.features[i].geometry.coordinates[1],
        lng: res?.data?.features[i].geometry.coordinates[0],
      });
    }
    if (addressToSet.length === res?.data?.features.length) {
      setValues(addressToSet);
    }
  };
  // Set Address in  setAddressValue State
  const SetAddress = async (item) => {
    if (item.target.textContent) {
      const selectedItem = item.target.textContent;
      for (var i = 0; i < values.length; i++) {
        if (values[i].label2 === selectedItem) {
          var postal_code = values[i].PostalCode;
          var lat = values[i].lat;
          var lng = values[i].lng;
          const city = values[i].city;
          await setAddressValue({
            ...addressValue,
            label: values[i].label,
            label2: values[i].label2,
            postal_code,
            lat,
            lng,
            city,
          });
        }
      }
    } else {
      await setAddressValue({
        ...addressValue,
        address: "",
        zip_code: "",
        lat: "",
        long: "",
        city: "",
      });
    }
  };
  // handleSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (first_name == "") {
      return toast.error("Veuillez entrer votre Prénom.");
    }
    if (last_name == "") {
      return toast.error("Veuillez entrer votre nom.");
    }
    if (email == "") {
      return toast.error("Veuillez entrer votre e-mail");
    }
    if (country == "") {
      return toast.error("veuillez d'abord ajouter le pays");
    }
    if (country == "France") {
      if (addressValue?.city == "") {
        return toast.error("Veuillez entrer votre adresse");
      }
      if (phone.length != 10 || phone[0] != 0) {
        return toast.error(
          "Le numéro de téléphone doit être composé de 10 chiffres et commencer par 0"
        );
      }
    } else {
      if (customeAddress == "") {
        return toast.error("entrer l'adresse personnalisée");
      }
    }
    if (institute == "") {
      return toast.error("Veuillez entrer votre établissement.");
    }
    if (date_of_birth == "") {
      return toast.error("Veuillez entrer votre date de naissance");
    }
    if (!accept_condition) {
      return toast.error("Veuillez accepter les termes et conditions");
    }
    if (country == "France") {
      setLoading(true);
      setresendLoading(true);
      let res = await api("post", "/users/create", {
        ...formData,
        address: addressValue,
      });
      if (res.status === 200) {
        setOtpByemail(false);
        SetconfirmationOpen(true);
        toast.success("OTP envoyé");
      }
      setLoading(false);

      timeInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(timeInterval);
        setTimeLeft(30);
        setresendLoading(false);
      }, 30000);
    } else {
      setLoading(true);
      setresendLoading(true);
      let res = await api("post", "/users/create", {
        ...formData,
        customenewAddress: customeAddress + " " + country,
      });
      if (res.status === 200) {
        setOtpByemail(true);
        SetconfirmationOpen(true);
        toast.success("OTP envoyé");
      }
      setLoading(false);

      timeInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(timeInterval);
        setTimeLeft(30);
        setresendLoading(false);
      }, 30000);
    }
  };
  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href={veryExcited} />
      </Helmet>
      <Grid container spacing={2} className="mainuserform">
        {imgloading && (
          <div className="formloading">
            <CircularProgress color="white" size="4rem" />
          </div>
        )}
        <Grid item xs={12} sm={4} className="dummyGrid">
          <img
            src={veryExcited}
            className="veryExitedImg "
            onLoad={() => setImgLoading(false)}
            alt="exited"
          />
        </Grid>
        {!imgloading && (
          <Grid item xs={12} sm={8} className="responsiveform">
            {/* <button onClick={play}>play</button> */}
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className="userForm"
            >
              <Grid container className="userformgrid">
                <Grid item xs={12} sm={12} className="">
                  <h3 className="formheading">
                    Pour mieux te conseiller, j’ai besoin <br className="br" />
                    d’en savoir davantage sur toi!
                  </h3>
                </Grid>
                <Grid container spacing={2} className="inputgrid1">
                  <Grid item xs={12} sm={6} className="inputGrid">
                    <input
                      name="first_name"
                      placeholder="Prénom"
                      className="inputField"
                      value={first_name}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className="inputGrid">
                    <input
                      name="last_name"
                      value={last_name}
                      onChange={onChange}
                      placeholder="Nom"
                      className="inputField"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="inputgrid1">
                  <Grid item xs={12} sm={6} className="inputGrid">
                    <Autocomplete
                      classes={{
                        option: classes.option,
                      }}
                      noOptionsText={
                        <div style={{ color: "white", fontSize: "12px" }}>
                          {" "}
                          Saisissez le nom de votre établissement s’il
                          n’apparait pas{" "}
                        </div>
                      }
                      PaperComponent={({ children }) => (
                        <Paper style={{ background: "#242635" }}>
                          {children}
                        </Paper>
                      )}
                      disableClearable
                      options={countries}
                      defaultValue={{ name: "France", code: "FR" }}
                      freeSolo
                      getOptionLabel={(option) => option.name}
                      onChange={handleChangecountry}
                      style={{
                        width: "91%",
                        margin: "auto",
                      }}
                      renderInput={(params) => (
                        <TextField
                          classes={{ root: classes.customTextFieldestablish }}
                          className="establish"
                          {...params}
                          placeholder="Pays"
                          variant="outlined"
                          value={country}
                          name="country"
                          onChange={onChangeCountry}
                        />
                      )}
                      // value={!education_level && ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className="inputGrid">
                    {country == "France" ? (
                      <Autocomplete
                        options={values}
                        classes={{
                          option: classes.option,
                          // noOptions: classes.noOptions,
                        }}
                        noOptionsText={
                          <div style={{ color: "white", fontSize: "12px" }}>
                            {" "}
                            aucune option{" "}
                          </div>
                        }
                        PaperComponent={({ children }) => (
                          <Paper style={{ background: "#242635" }}>
                            {children}
                          </Paper>
                        )}
                        getOptionLabel={(option) => option.label2 || ""}
                        onChange={SetAddress}
                        hiddenLabel="true"
                        style={{
                          width: "91%",
                          margin: "auto",
                        }}
                        renderInput={(params) => (
                          <TextField
                            classes={{ root: classes.customTextField }}
                            {...params}
                            placeholder="Adresse"
                            style={{ color: "white" }}
                            variant="outlined"
                            onChange={getAllAdress}
                            value={address}
                          />
                        )}
                      />
                    ) : (
                      <input
                        name="customeAddress"
                        value={customeAddress}
                        onChange={onChange}
                        placeholder="Adresse"
                        className="inputField"
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="">
                  <Grid item xs={12} sm={6} className="inputGrid">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      placeholder="E-mail"
                      className="inputField"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className="inputGrid">
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={onChange}
                      maxlength={country == "France" ? "10" : "100"}
                      placeholder="Numéro de téléphone"
                      className="inputField"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="">
                  <Grid item xs={12} sm={6} className="inputGrid">
                    <FormControl
                      variant="outlined"
                      className="selectformControl"
                    >
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="education_level"
                        value={education_level}
                        defaultValue={education_level}
                        onChange={onChange}
                        className={classes.select}
                        className="selectforeducation"
                        onFocus={handleBlurSchools}
                      >
                        <MenuItem
                          value="Classe"
                          disabled
                          style={{ textAlign: "left !important" }}
                        >
                          <em>{flagforSchool ? "College" : "Classe"}</em>
                        </MenuItem>
                        {education.map((edu, i) => {
                          return (
                            <MenuItem value={edu} disabled={i == 2}>
                              {edu}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} className="inputGrid">
                    <DatePicker
                      selected={date_of_birth}
                      // locale={selectedDateLang}
                      // locale={locale}
                      locale={"en-gb"}
                      dateFormat="dd/MM/yyyy"
                      onChange={onChangeDate}
                      className="inputField"
                      value={date_of_birth}
                      autoComplete="off"
                      placeholderText="Date de naissance"
                      openToDate={new Date("2003/01/01")}
                      dropdownMode="scroll"
                      // dropdownMode="select"
                      scrollableYearDropdown
                      showYearDropdown
                      yearDropdownItemNumber={18}
                      // scrollableYearDropdown
                      showMonthDropdown
                      adjustDateOnChange
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} className="establishGrid">
                  <Autocomplete
                    classes={{
                      option: classes.option,
                    }}
                    noOptionsText={
                      <div style={{ color: "white", fontSize: "12px" }}>
                        {" "}
                        Saisissez le nom de votre établissement s’il n’apparait
                        pas{" "}
                      </div>
                    }
                    PaperComponent={({ children }) => (
                      <Paper style={{ background: "#242635" }}>
                        {children}
                      </Paper>
                    )}
                    options={
                      education_level == "Quatrième" ||
                      education_level == "Troisième"
                        ? institutes?.filter(
                            (institute) => institute.type == "College"
                          )
                        : institutes?.filter(
                            (institute) => institute.type == "School"
                          )
                    }
                    freeSolo
                    getOptionLabel={(option) => option.name}
                    onChange={handleChangeSchool}
                    style={{
                      width: "94%",
                      margin: "auto",
                      padding: "15px",
                    }}
                    renderInput={(params) => (
                      <TextField
                        classes={{ root: classes.customTextFieldestablish }}
                        className="establish"
                        {...params}
                        placeholder="Établissement actuel (commencer par la ville)"
                        variant="outlined"
                        value={institute}
                        name="institute"
                        onChange={onChange}
                      />
                    )}
                    // value={!education_level && ""}
                    disabled={!education_level || education_level == "Classe"}
                  />
                </Grid>
                <Grid container spacing={1} className="termsandconditionGrid">
                  <Checkbox
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    style={{ color: "white" }}
                    name="accept_condition"
                    value={accept_condition}
                    onChange={onChange}
                  />
                  <span className="termsandcondition">
                    J’accepte les termes et les conditions
                  </span>
                </Grid>

                <Grid container spacing={2} className="formbuttonsGrid">
                  <Grid xs={12} sm={4}>
                    <div
                      size="large"
                      className="formbackbutton"
                      onClick={() => setStep(0)}
                    >
                      <img src={arrowleft} className="arrowleft" alt="arrow" />
                      <b> Retour</b>
                    </div>
                  </Grid>

                  <Grid xs={12} sm={4}></Grid>

                  <Grid xs={12} sm={4}>
                    <button
                      variant="contained"
                      className="formSubmitButton"
                      size="large"
                      type="submit"
                      disabled={loading}
                      style={{ opacity: `${loading ? "0.5" : "1"}` }}
                    >
                      <b>
                        {" "}
                        {loading ? (
                          <div className="circulardiv">
                            <CircularProgress size={20} className="" />
                          </div>
                        ) : (
                          "Commencer le test"
                        )}
                      </b>
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
            <ConfirmationPopup
              confirmationOpen={confirmationOpen}
              SetconfirmationOpen={SetconfirmationOpen}
              setStep={setStep}
              setActiveStep={setActiveStep}
              otpbyemail={otpbyemail}
              handleSubmit={handleSubmit}
              loadingresend={resendloading}
              timeLeft={timeLeft}
            />
          </Grid>
        )}{" "}
      </Grid>
    </>
  );
};
export default UserForm;
