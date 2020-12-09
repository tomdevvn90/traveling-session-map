<?php
/**
 *
 * @package Traveling Session Map
 * @since 1.0.0
 */

function my_travel_sessions_map_template() {
  $user_name = "unnamed";
  $current_user = wp_get_current_user();
  if ( $current_user ) {
      $user_name = $current_user->user_login;
  }
  ob_start();
?>
      <div id="trss-map-page">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
            <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.1/mapbox-gl-geocoder.css' type='text/css' />
            <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.css" />
            <link rel="stylesheet" href="<?php echo TRSSMAP_URI; ?>css/style.css" />

            <div id="map" data-user_name="<?php echo $user_name; ?>"></div>
            <div class="loader loader--style1" title="0" id="loader">
              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="70px" height="70px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                <path opacity="0.5" fill="#767E86" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
                <path fill="#0071A4" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z">
                  <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.8s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
            <div class="card c1 active" id="c1">
              <h1 >MY TRAVELS</h1>
            </div>

            <div class="card c2" id="c2">
              <h1 >GLOBAL TRENDS</h1>
            </div>

            <div class="map-sub-console"  id="map-sub-console">
                <div class="question-box">
                    <? tsm_favo_list_search_html() ?>
                    <div id="open-panel">
                        <h4 id="favorite-title" >Favorites Cities</h4>
                        <h5 id="arrow-mobile" class="active" >▼</h5>
                    </div>
                </div>
            </div>

            <div class="map-console" id="map-console">
              <h3>Welcome to Traveling Session, the only website featuring real reviews of travel destinations and festivals around the world. Plus expert travel tips and more. Share your thought about a destination using the stars in the User Reviews or register and log in to start sharing reviews of your favorite travel destinations...</h3>
              <h4 >Total Countries You Visited</h4>
              <h5 id="d1">0</h5>
              <h2 id="city">Click on Map or Type below</h2>
              <select name="states" id="example" class="form-control"  multiple="multiple" style="display: none;">
                <option class="option" data-country="Aruba" value="0">Aruba</option>
                <option class="option" data-country="Anguilla" value="1">Anguilla</option>
                <option class="option" data-country="Aland" value="2">Aland</option>
                <option class="option" data-country="Andorra" value="3">Andorra</option>
                <option class="option" data-country="American Samoa" value="4">American Samoa</option>
                <option class="option" data-country="Ashmore and Cartier Islands" value="5">Ashmore and Cartier Islands</option>
                <option class="option" data-country="Antigua and Barbuda" value="6">Antigua and Barbuda</option>
                <option class="option" data-country="Bahrain" value="7">Bahrain</option>
                <option class="option" data-country="Bajo Nuevo Bank (Petrel Is.)" value="8">Bajo Nuevo Bank (Petrel Is.)</option>
                <option class="option" data-country="Saint Barthelemy" value="9">Saint Barthelemy</option>
                <option class="option" data-country="Bermuda" value="10">Bermuda</option>
                <option class="option" data-country="Barbados" value="11">Barbados</option>
                <option class="option" data-country="Clipperton Island" value="12">Clipperton Island</option>
                <option class="option" data-country="Cyprus No Mans Area" value="13">Cyprus No Mans Area</option>
                <option class="option" data-country="Republic of Congo" value="14">Republic of Congo</option>
                <option class="option" data-country="Cook Islands" value="15">Cook Islands</option>
                <option class="option" data-country="Comoros" value="16">Comoros</option>
                <option class="option" data-country="Cape Verde" value="17">Cape Verde</option>
                <option class="option" data-country="Coral Sea Islands" value="18">Coral Sea Islands</option>
                <option class="option" data-country="Curaçao" value="19">Curaçao</option>
                <option class="option" data-country="Cayman Islands" value="20">Cayman Islands</option>
                <option class="option" data-country="Czech Republic" value="21">Czech Republic</option>
                <option class="option" data-country="Dominica" value="22">Dominica</option>
                <option class="option" data-country="Dhekelia Sovereign Base Area" value="23">Dhekelia Sovereign Base Area</option>
                <option class="option" data-country="Spain" value="24">Spain</option>
                <option class="option" data-country="France" value="25">France</option>
                <option class="option" data-country="Faroe Islands" value="26">Faroe Islands</option>
                <option class="option" data-country="Federated States of Micronesia" value="27">Federated States of Micronesia</option>
                <option class="option" data-country="Guernsey" value="28">Guernsey</option>
                <option class="option" data-country="Gibraltar" value="29">Gibraltar</option>
                <option class="option" data-country="Guinea Bissau" value="30">Guinea Bissau</option>
                <option class="option" data-country="Grenada" value="31">Grenada</option>
                <option class="option" data-country="Guam" value="32">Guam</option>
                <option class="option" data-country="Hong Kong S.A.R." value="33">Hong Kong S.A.R.</option>
                <option class="option" data-country="Heard Island and McDonald Islands" value="34">Heard Island and McDonald Islands</option>
                <option class="option" data-country="Isle of Man" value="35">Isle of Man</option>
                <option class="option" data-country="Indian Ocean Territories" value="36">Indian Ocean Territories</option>
                <option class="option" data-country="British Indian Ocean Territory" value="37">British Indian Ocean Territory</option>
                <option class="option" data-country="Jersey" value="38">Jersey</option>
                <option class="option" data-country="Baykonur Cosmodrome" value="39">Baykonur Cosmodrome</option>
                <option class="option" data-country="Siachen Glacier" value="40">Siachen Glacier</option>
                <option class="option" data-country="Kiribati" value="41">Kiribati</option>
                <option class="option" data-country="Saint Kitts and Nevis" value="42">Saint Kitts and Nevis</option>
                <option class="option" data-country="Saint Lucia" value="43">Saint Lucia</option>
                <option class="option" data-country="Liechtenstein" value="44">Liechtenstein</option>
                <option class="option" data-country="Macao S.A.R" value="45">Macao S.A.R</option>
                <option class="option" data-country="Saint Martin" value="46">Saint Martin</option>
                <option class="option" data-country="Monaco" value="47">Monaco</option>
                <option class="option" data-country="Maldives" value="48">Maldives</option>
                <option class="option" data-country="Marshall Islands" value="49">Marshall Islands</option>
                <option class="option" data-country="Malta" value="50">Malta</option>
                <option class="option" data-country="Northern Mariana Islands" value="51">Northern Mariana Islands</option>
                <option class="option" data-country="Montserrat" value="52">Montserrat</option>
                <option class="option" data-country="Mauritius" value="53">Mauritius</option>
                <option class="option" data-country="Norfolk Island" value="54">Norfolk Island</option>
                <option class="option" data-country="Niue" value="55">Niue</option>
                <option class="option" data-country="Nauru" value="56">Nauru</option>
                <option class="option" data-country="Pitcairn Islands" value="57">Pitcairn Islands</option>
                <option class="option" data-country="Spratly Islands" value="58">Spratly Islands</option>
                <option class="option" data-country="Palau" value="59">Palau</option>
                <option class="option" data-country="French Polynesia" value="60">French Polynesia</option>
                <option class="option" data-country="Scarborough Reef" value="61">Scarborough Reef</option>
                <option class="option" data-country="Serranilla Bank" value="62">Serranilla Bank</option>
                <option class="option" data-country="Singapore" value="63">Singapore</option>
                <option class="option" data-country="South Georgia and South Sandwich Islands" value="64">South Georgia and South Sandwich Islands</option>
                <option class="option" data-country="Saint Helena" value="65">Saint Helena</option>
                <option class="option" data-country="San Marino" value="66">San Marino</option>
                <option class="option" data-country="Saint Pierre and Miquelon" value="67">Saint Pierre and Miquelon</option>
                <option class="option" data-country="Sao Tome and Principe" value="68">Sao Tome and Principe</option>
                <option class="option" data-country="Swaziland" value="69">Swaziland</option>
                <option class="option" data-country="Sint Maarten" value="70">Sint Maarten</option>
                <option class="option" data-country="Seychelles" value="71">Seychelles</option>
                <option class="option" data-country="Turks and Caicos Islands" value="72">Turks and Caicos Islands</option>
                <option class="option" data-country="Tonga" value="73">Tonga</option>
                <option class="option" data-country="Tuvalu" value="74">Tuvalu</option>
                <option class="option" data-country="United States Minor Outlying Islands" value="75">United States Minor Outlying Islands</option>
                <option class="option" data-country="US Naval Base Guantanamo Bay" value="76">US Naval Base Guantanamo Bay</option>
                <option class="option" data-country="Vatican" value="77">Vatican</option>
                <option class="option" data-country="Saint Vincent and the Grenadines" value="78">Saint Vincent and the Grenadines</option>
                <option class="option" data-country="British Virgin Islands" value="79">British Virgin Islands</option>
                <option class="option" data-country="United States Virgin Islands" value="80">United States Virgin Islands</option>
                <option class="option" data-country="Wallis and Futuna" value="81">Wallis and Futuna</option>
                <option class="option" data-country="Akrotiri Sovereign Base Area" value="82">Akrotiri Sovereign Base Area</option>
                <option class="option" data-country="Samoa" value="83">Samoa</option>
                <option class="option" data-country="Fiji" value="84">Fiji</option>
                <option class="option" data-country="United Republic of Tanzania" value="85">United Republic of Tanzania</option>
                <option class="option" data-country="Western Sahara" value="86">Western Sahara</option>
                <option class="option" data-country="Canada" value="87">Canada</option>
                <option class="option" data-country="United States of America" value="88">United States of America</option>
                <option class="option" data-country="Kazakhstan" value="89">Kazakhstan</option>
                <option class="option" data-country="Uzbekistan" value="90">Uzbekistan</option>
                <option class="option" data-country="Papua New Guinea" value="91">Papua New Guinea</option>
                <option class="option" data-country="Indonesia" value="92">Indonesia</option>
                <option class="option" data-country="Argentina" value="93">Argentina</option>
                <option class="option" data-country="Chile" value="94">Chile</option>
                <option class="option" data-country="Democratic Republic of the Congo" value="95">Democratic Republic of the Congo</option>
                <option class="option" data-country="Somalia" value="96">Somalia</option>
                <option class="option" data-country="Kenya" value="97">Kenya</option>
                <option class="option" data-country="Sudan" value="98">Sudan</option>
                <option class="option" data-country="Chad" value="99">Chad</option>
                <option class="option" data-country="Haiti" value="100">Haiti</option>
                <option class="option" data-country="Dominican Republic" value="101">Dominican Republic</option>
                <option class="option" data-country="Russia" value="102">Russia</option>
                <option class="option" data-country="The Bahamas" value="103">The Bahamas</option>
                <option class="option" data-country="Falkland Islands" value="104">Falkland Islands</option>
                <option class="option" data-country="Norway" value="105">Norway</option>
                <option class="option" data-country="Greenland" value="106">Greenland</option>
                <option class="option" data-country="French Southern and Antarctic Lands" value="107">French Southern and Antarctic Lands</option>
                <option class="option" data-country="East Timor" value="108">East Timor</option>
                <option class="option" data-country="South Africa" value="109">South Africa</option>
                <option class="option" data-country="Lesotho" value="110">Lesotho</option>
                <option class="option" data-country="Mexico" value="111">Mexico</option>
                <option class="option" data-country="Uruguay" value="112">Uruguay</option>
                <option class="option" data-country="Brazil" value="113">Brazil</option>
                <option class="option" data-country="Bolivia" value="114">Bolivia</option>
                <option class="option" data-country="Peru" value="115">Peru</option>
                <option class="option" data-country="Colombia" value="116">Colombia</option>
                <option class="option" data-country="Panama" value="117">Panama</option>
                <option class="option" data-country="Costa Rica" value="118">Costa Rica</option>
                <option class="option" data-country="Nicaragua" value="119">Nicaragua</option>
                <option class="option" data-country="Honduras" value="120">Honduras</option>
                <option class="option" data-country="El Salvador" value="121">El Salvador</option>
                <option class="option" data-country="Guatemala" value="122">Guatemala</option>
                <option class="option" data-country="Belize" value="123">Belize</option>
                <option class="option" data-country="Venezuela" value="124">Venezuela</option>
                <option class="option" data-country="Guyana" value="125">Guyana</option>
                <option class="option" data-country="Suriname" value="126">Suriname</option>
                <option class="option" data-country="Ecuador" value="127">Ecuador</option>
                <option class="option" data-country="Puerto Rico" value="128">Puerto Rico</option>
                <option class="option" data-country="Jamaica" value="129">Jamaica</option>
                <option class="option" data-country="Cuba" value="130">Cuba</option>
                <option class="option" data-country="Zimbabwe" value="131">Zimbabwe</option>
                <option class="option" data-country="Botswana" value="132">Botswana</option>
                <option class="option" data-country="Namibia" value="133">Namibia</option>
                <option class="option" data-country="Senegal" value="134">Senegal</option>
                <option class="option" data-country="Mali" value="135">Mali</option>
                <option class="option" data-country="Mauritania" value="136">Mauritania</option>
                <option class="option" data-country="Benin" value="137">Benin</option>
                <option class="option" data-country="Niger" value="138">Niger</option>
                <option class="option" data-country="Nigeria" value="139">Nigeria</option>
                <option class="option" data-country="Cameroon" value="140">Cameroon</option>
                <option class="option" data-country="Togo" value="141">Togo</option>
                <option class="option" data-country="Ghana" value="142">Ghana</option>
                <option class="option" data-country="Ivory Coast" value="143">Ivory Coast</option>
                <option class="option" data-country="Guinea" value="144">Guinea</option>
                <option class="option" data-country="Guinea-Bissau" value="145">Guinea-Bissau</option>
                <option class="option" data-country="Liberia" value="146">Liberia</option>
                <option class="option" data-country="Sierra Leone" value="147">Sierra Leone</option>
                <option class="option" data-country="Burkina Faso" value="148">Burkina Faso</option>
                <option class="option" data-country="Central African Republic" value="149">Central African Republic</option>
                <option class="option" data-country="Republic of the Congo" value="150">Republic of the Congo</option>
                <option class="option" data-country="Gabon" value="151">Gabon</option>
                <option class="option" data-country="Equatorial Guinea" value="152">Equatorial Guinea</option>
                <option class="option" data-country="Zambia" value="153">Zambia</option>
                <option class="option" data-country="Malawi" value="154">Malawi</option>
                <option class="option" data-country="Mozambique" value="155">Mozambique</option>
                <option class="option" data-country="eSwatini" value="156">eSwatini</option>
                <option class="option" data-country="Angola" value="157">Angola</option>
                <option class="option" data-country="Burundi" value="158">Burundi</option>
                <option class="option" data-country="Israel" value="159">Israel</option>
                <option class="option" data-country="Lebanon" value="160">Lebanon</option>
                <option class="option" data-country="Madagascar" value="161">Madagascar</option>
                <option class="option" data-country="Palestine" value="162">Palestine</option>
                <option class="option" data-country="Gambia" value="163">Gambia</option>
                <option class="option" data-country="Tunisia" value="164">Tunisia</option>
                <option class="option" data-country="Algeria" value="165">Algeria</option>
                <option class="option" data-country="Jordan" value="166">Jordan</option>
                <option class="option" data-country="United Arab Emirates" value="167">United Arab Emirates</option>
                <option class="option" data-country="Qatar" value="168">Qatar</option>
                <option class="option" data-country="Kuwait" value="169">Kuwait</option>
                <option class="option" data-country="Iraq" value="170">Iraq</option>
                <option class="option" data-country="Oman" value="171">Oman</option>
                <option class="option" data-country="Vanuatu" value="172">Vanuatu</option>
                <option class="option" data-country="Cambodia" value="173">Cambodia</option>
                <option class="option" data-country="Thailand" value="174">Thailand</option>
                <option class="option" data-country="Laos" value="175">Laos</option>
                <option class="option" data-country="Myanmar" value="176">Myanmar</option>
                <option class="option" data-country="Vietnam" value="177">Vietnam</option>
                <option class="option" data-country="North Korea" value="178">North Korea</option>
                <option class="option" data-country="South Korea" value="179">South Korea</option>
                <option class="option" data-country="Mongolia" value="180">Mongolia</option>
                <option class="option" data-country="India" value="181">India</option>
                <option class="option" data-country="Bangladesh" value="182">Bangladesh</option>
                <option class="option" data-country="Bhutan" value="183">Bhutan</option>
                <option class="option" data-country="Nepal" value="184">Nepal</option>
                <option class="option" data-country="Pakistan" value="185">Pakistan</option>
                <option class="option" data-country="Afghanistan" value="186">Afghanistan</option>
                <option class="option" data-country="Tajikistan" value="187">Tajikistan</option>
                <option class="option" data-country="Kyrgyzstan" value="188">Kyrgyzstan</option>
                <option class="option" data-country="Turkmenistan" value="189">Turkmenistan</option>
                <option class="option" data-country="Iran" value="190">Iran</option>
                <option class="option" data-country="Syria" value="191">Syria</option>
                <option class="option" data-country="Armenia" value="192">Armenia</option>
                <option class="option" data-country="Sweden" value="193">Sweden</option>
                <option class="option" data-country="Belarus" value="194">Belarus</option>
                <option class="option" data-country="Ukraine" value="195">Ukraine</option>
                <option class="option" data-country="Poland" value="196">Poland</option>
                <option class="option" data-country="Austria" value="197">Austria</option>
                <option class="option" data-country="Hungary" value="198">Hungary</option>
                <option class="option" data-country="Moldova" value="199">Moldova</option>
                <option class="option" data-country="Romania" value="200">Romania</option>
                <option class="option" data-country="Lithuania" value="201">Lithuania</option>
                <option class="option" data-country="Latvia" value="202">Latvia</option>
                <option class="option" data-country="Estonia" value="203">Estonia</option>
                <option class="option" data-country="Germany" value="204">Germany</option>
                <option class="option" data-country="Bulgaria" value="205">Bulgaria</option>
                <option class="option" data-country="Greece" value="206">Greece</option>
                <option class="option" data-country="Turkey" value="207">Turkey</option>
                <option class="option" data-country="Albania" value="208">Albania</option>
                <option class="option" data-country="Croatia" value="209">Croatia</option>
                <option class="option" data-country="Switzerland" value="210">Switzerland</option>
                <option class="option" data-country="Luxembourg" value="211">Luxembourg</option>
                <option class="option" data-country="Belgium" value="212">Belgium</option>
                <option class="option" data-country="Netherlands" value="213">Netherlands</option>
                <option class="option" data-country="Portugal" value="214">Portugal</option>
                <option class="option" data-country="Ireland" value="215">Ireland</option>
                <option class="option" data-country="New Caledonia" value="216">New Caledonia</option>
                <option class="option" data-country="Solomon Islands" value="217">Solomon Islands</option>
                <option class="option" data-country="New Zealand" value="218">New Zealand</option>
                <option class="option" data-country="Australia" value="219">Australia</option>
                <option class="option" data-country="Sri Lanka" value="220">Sri Lanka</option>
                <option class="option" data-country="China" value="221">China</option>
                <option class="option" data-country="Taiwan" value="222">Taiwan</option>
                <option class="option" data-country="Italy" value="223">Italy</option>
                <option class="option" data-country="Denmark" value="224">Denmark</option>
                <option class="option" data-country="United Kingdom" value="225">United Kingdom</option>
                <option class="option" data-country="Iceland" value="226">Iceland</option>
                <option class="option" data-country="Azerbaijan" value="227">Azerbaijan</option>
                <option class="option" data-country="Georgia" value="228">Georgia</option>
                <option class="option" data-country="Philippines" value="229">Philippines</option>
                <option class="option" data-country="Malaysia" value="230">Malaysia</option>
                <option class="option" data-country="Brunei" value="231">Brunei</option>
                <option class="option" data-country="Slovenia" value="232">Slovenia</option>
                <option class="option" data-country="Finland" value="233">Finland</option>
                <option class="option" data-country="Slovakia" value="234">Slovakia</option>
                <option class="option" data-country="Czechia" value="235">Czechia</option>
                <option class="option" data-country="Eritrea" value="236">Eritrea</option>
                <option class="option" data-country="Japan" value="237">Japan</option>
                <option class="option" data-country="Paraguay" value="238">Paraguay</option>
                <option class="option" data-country="Yemen" value="239">Yemen</option>
                <option class="option" data-country="Saudi Arabia" value="240">Saudi Arabia</option>
                <option class="option" data-country="Antarctica" value="241">Antarctica</option>
                <option class="option" data-country="Northern Cyprus" value="242">Northern Cyprus</option>
                <option class="option" data-country="Cyprus" value="243">Cyprus</option>
                <option class="option" data-country="Morocco" value="244">Morocco</option>
                <option class="option" data-country="Egypt" value="245">Egypt</option>
                <option class="option" data-country="Libya" value="246">Libya</option>
                <option class="option" data-country="Ethiopia" value="247">Ethiopia</option>
                <option class="option" data-country="Djibouti" value="248">Djibouti</option>
                <option class="option" data-country="Somaliland" value="249">Somaliland</option>
                <option class="option" data-country="Uganda" value="250">Uganda</option>
                <option class="option" data-country="Rwanda" value="251">Rwanda</option>
                <option class="option" data-country="Bosnia and Herzegovina" value="252">Bosnia and Herzegovina</option>
                <option class="option" data-country="Macedonia" value="253">Macedonia</option>
                <option class="option" data-country="Republic of Serbia" value="254">Republic of Serbia</option>
                <option class="option" data-country="Montenegro" value="255">Montenegro</option>
                <option class="option" data-country="Kosovo" value="256">Kosovo</option>
                <option class="option" data-country="Trinidad and Tobago" value="257">Trinidad and Tobago</option>
                <option class="option" data-country="South Sudan" value="258">South Sudan</option>
              </select>

              <button id="saveButton" class="button button4">SAVE</button>
            </div>

            <div class="map-console2" id="map-console2">
              <h3>Welcome to Traveling Session, the only website featuring real reviews of travel destinations and festivals around the world. Plus expert travel tips and more. Share your thought about a destination using the stars in the User Reviews or register and log in to start sharing reviews of your favorite travel destinations...</h3>
              <div id="buttons" class="btn-group flex-wrap"  role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary __btn-disable" value="worldCountriesSum"><img src="<?php echo TRSSMAP_URI; ?>img/icons-07.png">Visited Cities</button>
                <? tsm_favo_list_filter_html() ?>
              </div>
              <h4 id="selectedLayer" >Select a Layer...</h4>
              <div id="Fav-City-List"></div>
            </div>

            <script src="https://api.mapbox.com/mapbox-gl-js/v1.6.1/mapbox-gl.js"></script>
            <script src='https://unpkg.com/@turf/turf/turf.min.js'></script>
            <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.1/mapbox-gl-geocoder.min.js'></script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            <!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script> -->
            <script src="//d3js.org/d3.v4.min.js" charset="utf-8"></script>
            <script src="<?php echo TRSSMAP_URI; ?>dist/js/BsMultiSelect.js"></script>
            <!-- <script src="<?php echo TRSSMAP_URI; ?>js/main.js"></script> -->
      </div>
<?php
  return ob_get_clean();
}
?>
