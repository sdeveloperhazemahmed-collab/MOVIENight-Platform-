import { useContext } from "react";
import { UsedBtnContext } from "../contexts/UsedBtnContext";

export default function Buttons() {
  const { selectedBtn, setSelectedBtn } = useContext(UsedBtnContext);

  return (
    <div className="flex justify-center items-start gap-10 w-full h-fit py-9">
      <span
        className={`group border-[3px] ${selectedBtn === "disney" ? "border-[var(--light-color)]" : "border-transparent"
          } hover:border-[var(--light-color)] rounded-full w-fit h-fit p-[5px] transition-all duration-300`}>
        <button
          onClick={() => setSelectedBtn("disney")}
          className="flex justify-center items-center w-[150px] h-[80px] rounded-full bg-white/10 transition-all duration-300 overflow-hidden relative">
          <span
            className={`absolute inset-0 rounded-full [background-image:var(--disney-btn-bg)] transition-opacity duration-300 ${selectedBtn === "disney" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          ></span>
          <img className="relative z-10 w-[100px]" src="disney+.png" />
        </button>
      </span>

      <span
        className={`group border-[3px] ${selectedBtn === "pixar" ? "border-[var(--light-color)]" : "border-transparent"
          } hover:border-[var(--light-color)] rounded-full w-fit h-fit p-[5px] transition-all duration-300`}>
        <button
          onClick={() => setSelectedBtn("pixar")}
          className="flex justify-center items-center w-[150px] h-[80px] rounded-full bg-white/10 transition-all duration-300 overflow-hidden relative">
          <span
            className={`absolute inset-0 rounded-full [background-image:var(--pixar-btn-bg)] transition-opacity duration-300 ${selectedBtn === "pixar" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          ></span>
          <svg className="relative z-10 w-[120px]" fill="#ffffff" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 7.35865,8.2248 C 7.2212,8.116 7.10579,7.9904 6.6962,7.5041 6.5232,7.2987 6.36361,7.1111 6.34155,7.0873 6.30305,7.0453 6.29735,7.0493 6.19622,7.1928 6.0705,7.3706 5.79658,7.8232 5.80784,7.8345 c 0.004,0 0.0955,0.023 0.20254,0.042 0.21305,0.037 0.22769,0.045 0.25107,0.1396 l 0.0159,0.064 -0.59816,0 -0.59815,0 0.0247,-0.081 c 0.0216,-0.07 0.037,-0.083 0.12089,-0.096 0.0529,-0.01 0.12111,-0.038 0.15161,-0.066 C 5.45464,7.7681 5.7295,7.4407 5.9766,7.1249 L 6.1827,6.8615 5.95633,6.5623 C 5.83182,6.3977 5.65703,6.177 5.56789,6.0719 5.41577,5.8925 5.39891,5.8798 5.29286,5.8652 5.15408,5.8462 5.1329,5.8332 5.10211,5.7526 l -0.0243,-0.064 0.59767,0 0.59767,0 -0.0154,0.064 c -0.022,0.092 -0.0219,0.092 -0.12563,0.1086 -0.0519,0.01 -0.0943,0.021 -0.0943,0.028 0,0.01 0.091,0.1452 0.20233,0.3066 0.19501,0.283 0.20382,0.292 0.24377,0.2504 0.053,-0.055 0.37442,-0.5259 0.37442,-0.5483 0,-0.01 -0.0573,-0.024 -0.1273,-0.033 C 6.59894,5.8489 6.5704,5.8299 6.54314,5.7406 l -0.0162,-0.053 0.58766,0 c 0.62095,0 0.60363,0 0.57365,0.1084 C 7.67705,5.838 7.64595,5.85 7.49516,5.874 7.39636,5.89 7.29224,5.917 7.26387,5.935 c -0.0511,0.033 -0.64,0.7213 -0.64,0.7485 0,0.01 0.24,0.3692 0.53334,0.8033 0.29333,0.4341 0.53685,0.7975 0.54115,0.8076 0.004,0.01 -0.0449,0.018 -0.10925,0.018 -0.10034,0 -0.13329,-0.013 -0.23053,-0.09 z M 12.4801,7.9406 C 12.2339,7.7351 11.97332,7.464 11.82061,7.2544 11.73671,7.1394 11.71204,7.1202 11.64667,7.1196 l -0.0762,-6e-4 0,0.3612 0,0.3613 0.16996,0.027 c 0.23973,0.039 0.24524,0.041 0.2735,0.122 0.014,0.04 0.0254,0.077 0.0254,0.081 0,0.01 -0.27956,0.01 -0.62124,0.01 -0.3697,0 -0.62125,-0.01 -0.62125,-0.022 0,-0.084 0.0517,-0.14 0.16262,-0.1768 l 0.1187,-0.039 0,-0.9578 c 0,-0.892 -0.003,-0.9585 -0.041,-0.9692 -0.0226,-0.01 -0.11676,-0.024 -0.20933,-0.039 -0.15717,-0.025 -0.16998,-0.032 -0.19341,-0.099 -0.0138,-0.04 -0.0251,-0.076 -0.0251,-0.08 0,0 0.29056,-0.01 0.64568,-0.01 0.69687,0 0.88295,0.021 1.12491,0.1282 0.14743,0.065 0.30144,0.216 0.34329,0.3362 0.0166,0.048 0.0299,0.1603 0.0297,0.2506 -6.7e-4,0.2886 -0.13486,0.4758 -0.41448,0.5781 l -0.1346,0.049 0.13278,0.1904 c 0.19606,0.281 0.3978,0.5467 0.53869,0.7093 l 0.12468,0.144 -0.0876,0.015 c -0.0482,0.01 -0.11449,0.02 -0.1473,0.027 -0.0485,0.01 -0.10174,-0.023 -0.28494,-0.1763 z M 12.0045,6.8242 c 0.0473,-0.022 0.11398,-0.083 0.14829,-0.135 0.0539,-0.081 0.0624,-0.1187 0.0624,-0.2736 0,-0.1524 -0.009,-0.1922 -0.0586,-0.266 -0.0752,-0.1115 -0.24988,-0.1979 -0.43956,-0.2177 l -0.14652,-0.015 0,0.4873 0,0.4873 0.17405,-0.013 c 0.0957,-0.01 0.21271,-0.031 0.25997,-0.054 z M 1.02665,7.9996 c 0.0238,-0.078 0.0305,-0.082 0.19121,-0.1085 0.0916,-0.015 0.19024,-0.037 0.21925,-0.048 l 0.0528,-0.02 0,-0.9475 c 0,-0.7714 -0.006,-0.9497 -0.0315,-0.9596 C 1.44111,5.906 1.36461,5.896 1.28845,5.887 1.09561,5.863 1.05392,5.843 1.02513,5.7607 l -0.0251,-0.072 0.67557,0 c 1.0281,0 1.28532,0.064 1.43575,0.3593 0.10639,0.2085 0.006,0.5511 -0.22096,0.7553 -0.19818,0.1782 -0.52656,0.3141 -0.76166,0.3151 -0.071,4e-4 -0.0762,-0.01 -0.0762,-0.079 0,-0.075 0.006,-0.081 0.10864,-0.1066 C 2.51032,6.8448 2.68677,6.5967 2.61443,6.2951 2.56213,6.0773 2.39413,5.9615 2.08386,5.9295 l -0.1251,-0.013 0,0.962 0,0.9621 0.15824,0.026 c 0.25844,0.043 0.28716,0.051 0.2875,0.08 1.6e-4,0.015 0.007,0.051 0.0145,0.08 l 0.0141,0.053 -0.71556,0 -0.71556,0 0.0247,-0.081 z m 2.38556,0.059 c 0,-0.012 0.01,-0.047 0.0216,-0.079 0.0188,-0.05 0.0494,-0.062 0.23469,-0.098 L 3.88157,7.8406 3.87557,6.8782 3.86957,5.9158 3.66456,5.8768 C 3.55181,5.8558 3.45508,5.8338 3.44962,5.8278 c -0.005,-0.01 -0.0172,-0.039 -0.0261,-0.074 l -0.0162,-0.064 0.71537,0 0.71536,0 -0.0243,0.079 c -0.0237,0.077 -0.0289,0.08 -0.20293,0.107 -0.0982,0.015 -0.19705,0.033 -0.21961,0.04 -0.0382,0.011 -0.041,0.077 -0.041,0.969 l 0,0.9572 0.19777,0.029 c 0.10878,0.016 0.20919,0.036 0.22314,0.045 0.014,0.01 0.035,0.049 0.0468,0.09 l 0.0214,0.075 -0.71339,0 c -0.42684,0 -0.71338,-0.01 -0.71338,-0.022 z m 4.31357,0.014 c 0,0 0.0112,-0.04 0.0248,-0.08 0.0228,-0.065 0.0385,-0.074 0.19273,-0.1035 l 0.1679,-0.032 0.0967,-0.2464 C 8.34368,7.2648 8.81822,6.0163 8.83708,5.9554 8.85158,5.9084 8.84008,5.9024 8.68939,5.8754 8.49354,5.8404 8.48408,5.8354 8.4635,5.7533 l -0.0161,-0.064 0.71536,0 0.71537,0 -0.0244,0.079 c -0.0232,0.076 -0.0309,0.08 -0.16191,0.095 -0.0756,0.01 -0.13755,0.021 -0.13755,0.028 0,0.06 0.55611,1.536 0.67995,1.8044 l 0.0878,0.1903 0.10963,0.016 c 0.0876,0.013 0.11411,0.028 0.13189,0.075 0.0122,0.032 0.0223,0.068 0.0223,0.08 0,0.013 -0.23931,0.022 -0.58901,0.022 l -0.58902,0 0.0149,-0.074 c 0.008,-0.041 0.0187,-0.078 0.0233,-0.083 0.005,0 0.074,-0.021 0.15417,-0.035 0.17428,-0.032 0.17367,0 0.01,-0.4591 L 9.4989,7.1187 l -0.37136,0 -0.37136,0 -0.023,0.06 c -0.0316,0.083 -0.1634,0.6086 -0.1634,0.6516 0,0.024 0.0371,0.04 0.12533,0.051 0.15578,0.019 0.17504,0.031 0.20166,0.1241 l 0.0214,0.075 -0.59617,0 c -0.32789,0 -0.59616,0 -0.59616,-0.01 z M 9.38954,6.8676 C 9.38654,6.7996 9.11278,6.063 9.09878,6.0856 c -0.0148,0.024 -0.27117,0.7737 -0.27117,0.793 0,0 0.1266,0.01 0.28132,0.01 0.15473,0 0.281,-0.01 0.28061,-0.018 z"></path></g></svg>
        </button>
      </span>

      <span
        className={`group border-[3px] ${selectedBtn === "marvel" ? "border-[var(--light-color)]" : "border-transparent"
          } hover:border-[var(--light-color)] rounded-full w-fit h-fit p-[5px] transition-all duration-300`}>
        <button
          onClick={() => setSelectedBtn("marvel")}
          className="flex justify-center items-center w-[150px] h-[80px] rounded-full bg-white/10 transition-all duration-300 overflow-hidden relative">
          <span
            className={`absolute inset-0 rounded-full [background-image:var(--marvel-btn-bg)] transition-opacity duration-300 ${selectedBtn === "marvel" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          ></span>
          <img className="relative z-10 w-[100px]" src="marvel.png" />
        </button>
      </span>

      <span
        className={`group border-[3px] ${selectedBtn === "starwars" ? "border-[var(--light-color)]" : "border-transparent"
          } hover:border-[var(--light-color)] rounded-full w-fit h-fit p-[5px] transition-all duration-300`}>
        <button
          onClick={() => setSelectedBtn("starwars")}
          className="flex justify-center items-center w-[150px] h-[80px] rounded-full bg-white/10 transition-all duration-300 overflow-hidden relative">
          <span
            className={`absolute inset-0 rounded-full [background-image:var(--starwars-btn-bg)] transition-opacity duration-300 ${selectedBtn === "starwars" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          ></span>
          <svg className="relative z-10 w-[100px]" viewBox="0 0 192.756 192.756" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g fill-rule="evenodd" clip-rule="evenodd"><path d="M5.669 81.215v12.65h37.003c4.301 0 9.796-3.977 9.796-10.556 0-2.646 1.012-4.372-2.098-7.872l-4.733-5.608c-2.712-2.53.324-2.53 2.602-2.53h15.623v26.566h12.39V67.299h16.699V55.922H38.877c-6.579 0-9.796 6.317-9.615 9.606.182 3.289.787 7.427 6.254 12.398 4.987 4.533-2.469 3.289-3.218 3.289H5.669zM120.348 55.922H100.36L89.155 93.866h12.47l2.023-5.313h13.156l1.953 5.313h12.215l-10.624-37.944zm-13.916 23.522l4.301-13.916 4.049 13.916h-8.35zM170.443 81.215c-4.807 0-4.807-1.771-4.807-1.771 4.119 0 7.771-6.001 7.771-12.145s-6-11.377-10.809-11.377h-26.891v37.944h13.664v-12.65s5.818 6.831 8.854 9.614c3.037 2.783 3.289 3.036 7.41 3.036h21.449v-12.65c.002-.001-11.834-.001-16.641-.001zm-12.398-8.855h-8.672v-6.832h8.672c3.976 0 4.664 6.832 0 6.832zM5.669 98.672h13.979l3.542 12.652 3.289-12.652h14.675l3.795 12.652 3.796-12.652h12.144l-11.133 37.953H38.624l-4.878-17.965-5.496 17.965H16.865L5.669 98.672zM89.578 98.891H69.59l-11.204 37.943h12.469l2.024-5.312h13.157l1.953 5.312h12.216L89.578 98.891zm-13.915 23.521l4.301-13.916 4.048 13.916h-8.349zM170.695 110.059c-2.275 0-4.756.266-2.043 2.795l4.734 5.609c3.109 3.5 3.059 4.959 3.059 7.607 0 6.578-6.508 10.555-10.809 10.555l-29.896.201c-4.119 0-4.371-.252-7.408-3.035-3.035-2.783-8.855-9.615-8.855-9.615v12.65h-13.662V98.883h26.891c4.807 0 10.809 5.234 10.809 11.377 0 6.145-3.652 12.145-7.773 12.145 0 0 1.812 1.822 4.848 1.822 3.037 0 14.727.012 14.727.012.748 0 8.203 1.244 3.217-3.289-5.467-4.971-6.072-9.107-6.254-12.396s2.662-9.881 9.238-9.881h25.57v11.387h-16.393v-.001zm-42.545 5.261h-8.674v-6.832h8.674c3.977 0 4.664 6.832 0 6.832z"></path></g></svg>
        </button>
      </span>

      <span
        className={`group border-[3px] ${selectedBtn === "natgeo" ? "border-[var(--light-color)]" : "border-transparent"
          } hover:border-[var(--light-color)] rounded-full w-fit h-fit p-[5px] transition-all duration-300`}>
        <button
          onClick={() => setSelectedBtn("natgeo")}
          className="flex justify-center items-center w-[150px] h-[80px] rounded-full bg-white/10 transition-all duration-300 overflow-hidden relative">
          <span
            className={`absolute inset-0 rounded-full [background-image:var(--natgeo-btn-bg)] transition-opacity duration-300 ${selectedBtn === "natgeo" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          ></span>
          <img className="relative z-10 w-[125px]" src="nationalgeographic.png" />
        </button>
      </span>
    </div>
  );
}