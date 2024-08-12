import FormikRegister from "@/components/formik/formikRegister/FormikRegister";
import { fetchGetAllDepartamentsCuontries } from "@/services/DepartamentosPaisService/DepartamentosPaisApiService";
import { fetchGetAllMunicipios } from "@/services/MunicipiosService/MunicipiosApiService";
import { fetchGetAllCountries } from "@/services/PaisService/PaisApiService";

export default async function RegisterPage() {
    const countries = await fetchGetAllCountries();
    const departaments = await fetchGetAllDepartamentsCuontries();
    const municipios = await fetchGetAllMunicipios();
    console.log(municipios);
    return (
        <FormikRegister dataCountries={countries.data} dataDepartaments={departaments.data} dataMunicipios={municipios.data} />
    )
}