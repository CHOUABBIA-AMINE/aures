import "../../../../../picture.css"

import dayjs 					from "dayjs";
import { useSnackbar } 			from "notistack";
import { NumericFormat } 		from "react-number-format";

import { useEffect } 			from "react";
import { useState } 			from "react";
import { useLocation } 			from "react-router-dom";
import { useNavigate } 			from "react-router-dom";
import { useParams } 			from "react-router-dom";

import { Autocomplete } 		from "@mui/material";
import { Box } 					from "@mui/material";
import { Button } 				from "@mui/material";
import { Container } 			from "@mui/material";
import { debounce } 			from "@mui/material";
import { FormControl } 			from "@mui/material";
import { InputLabel } 			from "@mui/material";
import { Grid } 				from "@mui/material";
import { MenuItem } 			from "@mui/material";
import { Paper } 				from "@mui/material";
import { Select } 				from "@mui/material";
import { TextField } 			from "@mui/material";
import { Tooltip } 				from "@mui/material";
import { Typography } 			from "@mui/material";

import { GppBad } 				from "@mui/icons-material";
import { Replay } 				from "@mui/icons-material";
import { Save } 				from "@mui/icons-material";

import { DatePicker } 			from "@mui/x-date-pickers/DatePicker";

import { useHTTP } 				from "../../../../../api/request";
import { formatURL } 			from "../../../../../api/tools";

import { Provider } 			from "../../../../../model/realization/provider/provider";
import { EconomicNature } 		from "../../../../../model/realization/provider/economic.nature";
import { Country } 				from "../../../../../model/common/country";
import { State } 				from "../../../../../model/common/state";

const ProviderDetails = (props : any) => {

	const location 					= useLocation();
	const params 					= useParams();
	const { enqueueSnackbar } 		= useSnackbar();

	let readOnly 					= params.action === 'edit' ? false : true;
    const navigate          		= useNavigate();
	
	const { getUrl, getBasedUrl, patchUrl, postBasedUrl, uploadFile, getFile} = useHTTP();

	const [ economicNatures, setEconomicNatures ]	= useState<EconomicNature[]>([]);
	const [ economicNature, setEconomicNature ]		= useState<string>("");

	const [ countries, setCountries ]				= useState<Country[]>([]);
	const [ country, setCountry ]					= useState<Country | null>(null);

	const [ states, setStates ]						= useState<State[]>([]);
	const [ state, setState ]						= useState<string>("");
	const [ disState, setDisState ]					= useState<boolean>(false);

	const [ image, setImage ] 						= useState();
    const [ preview, setPreview] 					= useState<string>();

	const [ provider, setProvider ]		= useState<Provider>({
		designationLt           : "",
		designationAr           : "",
		acronymLt               : "",
		acronymAr               : "",
		address                 : "",
		capital                 : 0.00,
		comercialRegistryNumber : "",
		comercialRegistryDate   : dayjs(),
		taxeIdentityNumber      : "",
		statIdentityNumber      : "",
		bank                    : "",
		bankAccount             : "",
		swiftNumber             : "",
		phoneNumbers            : "",
		faxNumbers              : "",
		mail                    : "",
		website                 : "",
		_links          : {
			provider                :{
				href                    : ""
			},
			self                    :{
				href                    : ""
			},
			logo                    :{
				href                    : ""
			},
			economicNature          :{
				href                    : ""
			},
			country                 :{
				href                    : ""
			},
			state                   :{
				href                    : ""
			}
		}
	});

	const onSelectFile = (e : any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(undefined);
            return;
        }
        setImage(e.target.files[0])
    }

	const clickFileUploader = () => {
		document.getElementById("imageSelector")?.click()
	}

	const filterCountryBy = (e : any) =>{
		getBasedUrl("country/search/filterBy?filter=" + e.target.value).then((countries) => {
			setCountries(countries.data._embedded.country);
		})
	}

	const fetchData = ()=>{

		getUrl(formatURL(location.state.modelId)).then((prvd : any) => {
			setProvider({
				designationLt           : prvd.data.designationLt,
				designationAr           : prvd.data.designationAr,
				acronymLt               : prvd.data.acronymLt,
				acronymAr               : prvd.data.acronymAr,
				address                 : prvd.data.address,
				capital                 : prvd.data.capital,
				comercialRegistryNumber : prvd.data.comercialRegistryNumber,
				comercialRegistryDate   : prvd.data.comercialRegistryDate !== null ? dayjs(prvd.data.comercialRegistryDate) : dayjs(),
				taxeIdentityNumber      : prvd.data.taxeIdentityNumber,
				statIdentityNumber      : prvd.data.statIdentityNumber,
				bank                    : prvd.data.bank,
				bankAccount             : prvd.data.bankAccount,
				swiftNumber             : prvd.data.swiftNumber,
				phoneNumbers            : prvd.data.phoneNumbers,
				faxNumbers              : prvd.data.faxNumbers,
				mail                    : prvd.data.mail,
				website                 : prvd.data.website,
				_links          		: {
					provider       			:{
						href            		: prvd.data._links.provider.href
					},
					self            		:{
						href            		: prvd.data._links.self.href
					},
					logo   					:{
						href            		: prvd.data._links.logo.href
					},
					economicNature			:{
						href            		: prvd.data._links.economicNature.href
					},
					country   				:{
						href            		: prvd.data._links.country.href
					},
					state   				:{
						href            		: prvd.data._links.state.href
					}
				}
			})
			getUrl(formatURL(prvd.data._links.logo.href)).then((logo) => {
				setPreview(logo.data._links.self.href);
			}).catch(e => {});

			getUrl(formatURL(prvd.data._links.economicNature.href)).then((data) => {
				getUrl(formatURL(data.data._links.economicNature.href)).then((economicNature) => {
					setEconomicNature(economicNature.data._links.economicNature.href);
				})
			});

			getUrl(formatURL(prvd.data._links.country.href)).then((data) => {
				getUrl(formatURL(data.data._links.country.href)).then((country) => {
					setCountry(country.data);
					if(country.data?.designationFr === "la République algérienne démocratique et populaire"){
						setDisState(true);
						getUrl(formatURL(prvd.data._links.state.href)).then((state) => {
							setState(state.data._links.state.href);
						}).catch(e => {});
					}else{
						setDisState(false);
					}
				})
			});

			
		});
	}

	const patchData = ()=>{
		if(location.state != null){
			if(image !== undefined){
				uploadFile(image).then( _file => {
					patchUrl(formatURL(location.state.modelId), JSON.stringify({
						designationLt           : provider.designationLt,
						designationAr           : provider.designationAr,
						acronymLt               : provider.acronymLt,
						acronymAr               : provider.acronymAr,
						address                 : provider.address,
						capital                 : provider.capital,
						comercialRegistryNumber : provider.comercialRegistryNumber,
						comercialRegistryDate   : dayjs(provider.comercialRegistryDate),
						taxeIdentityNumber      : provider.taxeIdentityNumber,
						statIdentityNumber      : provider.statIdentityNumber,
						bank                    : provider.bank,
						bankAccount             : provider.bankAccount,
						swiftNumber             : provider.swiftNumber,
						phoneNumbers            : provider.phoneNumbers,
						faxNumbers              : provider.faxNumbers,
						mail                    : provider.mail,
						website                 : provider.website,
						economicNature			: economicNature,
						country					: country?._links.self.href,
						state					: state,
						logo  					: getFile(_file.data.id)
					})).then((provider) => {
						
						if(provider.data !== undefined){
							setProvider(provider.data);
							enqueueSnackbar('Entity updated successfully !', {variant: 'success'});
						}
					});
				});
			}else{
				patchUrl(formatURL(location.state.modelId), JSON.stringify({
					designationLt           : provider.designationLt,
					designationAr           : provider.designationAr,
					acronymLt               : provider.acronymLt,
					acronymAr               : provider.acronymAr,
					address                 : provider.address,
					capital                 : provider.capital,
					comercialRegistryNumber : provider.comercialRegistryNumber,
					comercialRegistryDate   : dayjs(provider.comercialRegistryDate),
					taxeIdentityNumber      : provider.taxeIdentityNumber,
					statIdentityNumber      : provider.statIdentityNumber,
					bank                    : provider.bank,
					bankAccount             : provider.bankAccount,
					swiftNumber             : provider.swiftNumber,
					phoneNumbers            : provider.phoneNumbers,
					faxNumbers              : provider.faxNumbers,
					mail                    : provider.mail,
					website                 : provider.website,
					economicNature			: economicNature,
					country					: country?._links.self.href,
					state					: state
				})).then((provider) => {
					
					if(provider.data !== undefined){
						setProvider(provider.data);
						enqueueSnackbar('Entity updated successfully !', {variant: 'success'});
					}
				});
			}
		}else{
			if(image !== undefined){
				uploadFile(image).then( _file => {
					postBasedUrl("provider", JSON.stringify({
						designationLt           : provider.designationLt,
						designationAr           : provider.designationAr,
						acronymLt               : provider.acronymLt,
						acronymAr               : provider.acronymAr,
						address                 : provider.address,
						capital                 : provider.capital,
						comercialRegistryNumber : provider.comercialRegistryNumber,
						comercialRegistryDate   : dayjs(provider.comercialRegistryDate),
						taxeIdentityNumber      : provider.taxeIdentityNumber,
						statIdentityNumber      : provider.statIdentityNumber,
						bank                    : provider.bank,
						bankAccount             : provider.bankAccount,
						swiftNumber             : provider.swiftNumber,
						phoneNumbers            : provider.phoneNumbers,
						faxNumbers              : provider.faxNumbers,
						mail                    : provider.mail,
						website                 : provider.website,
						economicNature			: economicNature,
						country					: country?._links.self.href,
						state					: state,
						logo  					: getFile(_file.data.id)
					})).then((provider) => {
						if(provider.data !== undefined){
							setProvider(provider.data);
							enqueueSnackbar('Entity created successfully !', {variant: 'success'});
						}
					})
				})
			}else{
				postBasedUrl("provider", JSON.stringify({
					designationLt           : provider.designationLt,
					designationAr           : provider.designationAr,
					acronymLt               : provider.acronymLt,
					acronymAr               : provider.acronymAr,
					address                 : provider.address,
					capital                 : provider.capital,
					comercialRegistryNumber : provider.comercialRegistryNumber,
					comercialRegistryDate   : dayjs(provider.comercialRegistryDate),
					taxeIdentityNumber      : provider.taxeIdentityNumber,
					statIdentityNumber      : provider.statIdentityNumber,
					bank                    : provider.bank,
					bankAccount             : provider.bankAccount,
					swiftNumber             : provider.swiftNumber,
					phoneNumbers            : provider.phoneNumbers,
					faxNumbers              : provider.faxNumbers,
					mail                    : provider.mail,
					website                 : provider.website,
					economicNature			: economicNature,
					country					: country?._links.self.href,
					state					: state
				})).then((provider) => {
					if(provider.data !== undefined){
						setProvider(provider.data);
						enqueueSnackbar('Entity created successfully !', {variant: 'success'});
					}
				})
			}
		}
	}

	useEffect(() => {
        if (!image) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

	useEffect(() => {

		getBasedUrl("economicNature").then((economicNatures) => {
			setEconomicNatures(economicNatures.data._embedded.economicNature);
		});

		getBasedUrl("state").then((states) => {
			setStates(states.data._embedded.state);
		});

		if(location.state !== null){
			fetchData();
		}
    },[])

	return (
		<Container maxWidth="lg">
			<Paper variant="outlined" sx={{ marginTop: "60px", padding:'30px' }}>
				<Box sx={{display : "flex", paddingBottom: 5 , justifyContent: "space-between"}}>
					<Typography variant="h6" >
						Employee Details
					</Typography>
					<Box>
						<Tooltip title="Exclusions" arrow>
							<Button color="error" variant="outlined" size="small" sx={{ marginRight:'5px' }}  onClick={e => navigate("/provider/exclusions/edit", {state:provider})}>
								<GppBad />
							</Button>
						</Tooltip>
						<Tooltip title="Sauvegarder" arrow>
							<Button color="primary" variant="outlined" size="small" sx={{ marginRight:'5px' }} onClick={e => patchData()}>
								<Save />
							</Button>
						</Tooltip>
						<Tooltip title="Réinitialiser" arrow>
							<Button color="success" variant="outlined" size="small" sx={{ marginRight:'5px' }}  onClick={e => fetchData()}>
								<Replay />
							</Button>
						</Tooltip>
					</Box>
				</Box>
				<Grid container spacing={1} direction={"column"}>			
					
					<Grid item>
						<Grid container spacing={1} direction={"row"}>
							<Grid item xs={8} sm={8}>
								<Grid container spacing={1} direction={"row"}>
									<Grid item xs={6} sm={6}>
										<FormControl fullWidth size="small" >
											<InputLabel id="economicNatureLabel">Economic Nature</InputLabel>
											<Select
												required
												fullWidth
												size="small"
												labelId="economicNatureLabel"
												id="economicNature"
												variant="outlined"
												value={economicNature}
												label="Economic Nature"
												
												onChange={(e) => setEconomicNature(e.target.value)}
											>
												{
													economicNatures.length > 0 && economicNatures.map(economicNature => {
														return(
															<MenuItem key={economicNature._links.self.href} value={economicNature._links.economicNature.href}>{economicNature.designationFr}</MenuItem>
														);
													})
												}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={6} sm={6}></Grid>

									<Grid item xs={6} sm={6}>
										<FormControl fullWidth size="small">
											<TextField
												required
												fullWidth
												value={provider.designationAr}
												onChange={ (e) => setProvider(provider => ({...provider, designationAr: e.target.value})) }
												size="small"
												id="designationAr"
												name="designationAr"
												label="Designation (Ar)"
												autoComplete="off"
												variant="outlined"
												
												inputProps={{ 
													readOnly: readOnly,
													dir: "rtl"
												}}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={6} sm={6}>
										<FormControl sx={{width : "50%"}} size="small">
											<TextField
												required
												fullWidth
												value={provider.acronymAr}
												onChange={ (e) => setProvider(provider => ({...provider, acronymAr: e.target.value})) }
												size="small"
												id="acronymAr"
												name="acronymAr"
												label="Acronym (Ar)"
												autoComplete="off"
												variant="outlined"
												inputProps={{ 
													readOnly: readOnly,
													dir: "rtl" 
												}}
											/>
										</FormControl>
									</Grid>

									<Grid item xs={6} sm={6}>
										<FormControl fullWidth size="small">
											<TextField
												required
												fullWidth
												value={provider.designationLt}
												onChange={ (e) => setProvider(provider => ({...provider, designationLt: e.target.value})) }
												size="small"
												id="designationLt"
												name="designationLt"
												label="Designation (Lt)"
												autoComplete="off"
												variant="outlined"
												inputProps={{ 
													readOnly: readOnly 
												}}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={6} sm={6}>
										<FormControl sx={{width : "50%"}} size="small">
											<TextField
												required
												fullWidth
												value={provider.acronymLt}
												onChange={ (e) => setProvider(provider => ({...provider, acronymLt: e.target.value})) }
												size="small"
												id="acronymLt"
												name="acronymLt"
												label="Acronym (Lt)"
												autoComplete="off"
												variant="outlined"
												inputProps={{ 
													readOnly: readOnly 
												}}
											/>
										</FormControl>
									</Grid>

									<Grid item xs={6} sm={6}>
										<FormControl fullWidth size="small">
											<NumericFormat 
												required
												fullWidth
												thousandSeparator="."
												decimalSeparator=","
												allowedDecimalSeparators={[',', '.']}
												decimalScale={2}
												fixedDecimalScale
												customInput={TextField} 
												value={provider.capital}
												onValueChange={(values) => {setProvider(provider => ({...provider, capital: Number(values.floatValue)}))}}
												//onChange={ (e) => {console.log(e.target.value + " - " +contract.transferableAmount); setContract(contract => ({...contract, transferableAmount: Number(e.target.value)})) }}
												size="small"
												id="capital"
												name="capital"
												label="Capital"
												autoComplete="off"
												variant="outlined"
												inputProps={{ 
													readOnly: readOnly,
													dir: "rtl"
												}}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={6} sm={6}></Grid>

									<Grid item xs={6} sm={6}>
										<FormControl fullWidth size="small">
											<TextField
												required
												fullWidth
												value={provider.comercialRegistryNumber}
												onChange={ (e) => setProvider(provider => ({...provider, comercialRegistryNumber: e.target.value})) }
												size="small"
												id="comercialRegistryNumber"
												name="comercialRegistryNumber"
												label="Comercial Registry Number"
												autoComplete="off"
												variant="outlined"
												inputProps={{ 
													readOnly: readOnly 
												}}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={6} sm={6}>
										<FormControl fullWidth size="small">
											<DatePicker 
												format="DD/MM/YYYY" 
												label="Comercial Registry Date" 
												readOnly={readOnly} 
												slotProps={{ textField: { size: 'small', required: true }}} 
												value={provider.comercialRegistryDate} 
												onChange={ changedDate=>setProvider(provider => ({...provider, comercialRegistryDate:changedDate})) }
											/>
										</FormControl>
									</Grid>

									<Grid item xs={6} sm={6}>
										<FormControl fullWidth size="small">
											<TextField
												required
												fullWidth
												value={provider.taxeIdentityNumber}
												onChange={ (e) => setProvider(provider => ({...provider, taxeIdentityNumber: e.target.value})) }
												size="small"
												id="taxeIdentityNumber"
												name="taxeIdentityNumber"
												label="Taxe Identity Number"
												autoComplete="off"
												variant="outlined"
												inputProps={{ 
													readOnly: readOnly 
												}}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={6} sm={6}>
										<FormControl fullWidth size="small">
											<TextField
												required
												fullWidth
												value={provider.statIdentityNumber}
												onChange={ (e) => setProvider(provider => ({...provider, statIdentityNumber: e.target.value})) }
												size="small"
												id="statIdentityNumber"
												name="statIdentityNumber"
												label="Stat Identity Number"
												autoComplete="off"
												variant="outlined"
												inputProps={{ 
													readOnly: readOnly 
												}}
											/>
										</FormControl>
									</Grid>

								</Grid>
							</Grid>
							<Grid item xs={4} sm={4} >
								<Grid container direction={"column"}>
									<img src={preview !== undefined ? preview : ""} className="picture" onClick={clickFileUploader}/>
									<input type='file' hidden id="imageSelector" onChange={onSelectFile} />
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Grid item>
						<Grid container spacing={1} direction={"row"}>
							<Grid item xs={4} sm={4}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={provider.bank}
										onChange={ (e) => setProvider(provider => ({...provider, bank: e.target.value})) }
										size="small"
										id="bank"
										name="bank"
										label="Bank"
										autoComplete="off"
										variant="outlined"
										inputProps={{ 
											readOnly: readOnly 
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={4} sm={4}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={provider.bankAccount}
										onChange={ (e) => setProvider(provider => ({...provider, bankAccount: e.target.value})) }
										size="small"
										id="bankAccount"
										name="bankAccount"
										label="Bank Account"
										autoComplete="off"
										variant="outlined"
										inputProps={{ 
											readOnly: readOnly 
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={4} sm={4}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={provider.swiftNumber}
										onChange={ (e) => setProvider(provider => ({...provider, swiftNumber: e.target.value})) }
										size="small"
										id="swiftNumber"
										name="swiftNumber"
										label="Swift Number"
										autoComplete="off"
										variant="outlined"
										inputProps={{ 
											readOnly: readOnly 
										}}
									/>
								</FormControl>
							</Grid>

							<Grid item xs={6} sm={6}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={provider.phoneNumbers}
										onChange={ (e) => setProvider(provider => ({...provider, phoneNumbers: e.target.value})) }
										size="small"
										id="phoneNumbers"
										name="phoneNumbers"
										label="Phone Numbers"
										autoComplete="off"
										variant="outlined"
										inputProps={{ 
											readOnly: readOnly 
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={6} sm={6}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={provider.faxNumbers}
										onChange={ (e) => setProvider(provider => ({...provider, faxNumbers: e.target.value})) }
										size="small"
										id="faxNumbers"
										name="faxNumbers"
										label="Fax Numbers"
										autoComplete="off"
										variant="outlined"
										inputProps={{ 
											readOnly: readOnly 
										}}
									/>
								</FormControl>
							</Grid>

							<Grid item xs={6} sm={6}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={provider.mail}
										onChange={ (e) => setProvider(provider => ({...provider, mail: e.target.value})) }
										size="small"
										id="mail"
										name="mail"
										label="Mail"
										autoComplete="off"
										variant="outlined"
										inputProps={{ 
											readOnly: readOnly 
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={6} sm={6}></Grid>

							<Grid item xs={6} sm={6}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={provider.website}
										onChange={ (e) => setProvider(provider => ({...provider, website: e.target.value})) }
										size="small"
										id="website"
										name="website"
										label="Web Site"
										autoComplete="off"
										variant="outlined"
										inputProps={{ 
											readOnly: readOnly 
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={6} sm={6}></Grid>
							
							<Grid item xs={12} sm={12}>
								<FormControl fullWidth size="small">
									<TextField
										required
										fullWidth
										value={provider.address}
										onChange={ (e) => setProvider(provider => ({...provider, address: e.target.value})) }
										size="small"
										id="address"
										name="address"
										label="Address"
										autoComplete="off"
										variant="outlined"
										inputProps={{ 
											readOnly: readOnly 
										}}
									/>
								</FormControl>
							</Grid>

							<Grid item xs={4} sm={4}></Grid>
							<Grid item xs={4} sm={4}>
								<Autocomplete
									id="country"
									fullWidth
									size="small"
									options={countries}
									value={country}
									onChange={(e, value) => { setCountry(value); value?.designationFr === "la République algérienne démocratique et populaire" ? setDisState(true) : setDisState(false)}}
									getOptionLabel={(country) => country.designationFr}
									isOptionEqualToValue={(option, value) => option._links.self.href === value._links.self.href}
									renderInput={(params) => <TextField {...params} label="country" onChange={debounce(filterCountryBy, 200)}/>}
								/>
							</Grid>
							<Grid item xs={4} sm={4}>
								{	disState &&

									
									<FormControl fullWidth size="small" >
										<InputLabel id="state">State</InputLabel>
										<Select
											required
											fullWidth
											size="small"
											labelId="state"
											id="state"
											variant="outlined"
											value={state}
											label="State"
											
											onChange={(e) => { setState(e.target.value)
													//setMCategory(e.target.value); 
													//getRanks(e.target.value);
												}
											}
										>
											{
												states.length > 0 && states.map(state => {
													return(
														<MenuItem key={state._links.self.href} value={state._links.state.href}>{state.designationLt}</MenuItem>
													);
												})
											}
										</Select>
									</FormControl>
								}
							</Grid>
						</Grid>
					</Grid>

				</Grid>
			</Paper>
		</Container>
	);
}
export default ProviderDetails;

