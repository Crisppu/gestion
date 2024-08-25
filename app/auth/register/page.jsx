import FormikRegister from "@/components/formik/formikRegister/FormikRegister";
import { fetchGetAllDepartamentsCompanie } from "@/services/DepartamentosEmpresaService/DepartamentosEmpresaApiService";
import { fetchGetAllDepartamentsCuontries } from "@/services/DepartamentosPaisService/DepartamentosPaisApiService";
import { fetchGetAllMunicipios } from "@/services/MunicipiosService/MunicipiosApiService";
import { fetchGetAllCountries } from "@/services/PaisService/PaisApiService";
import { fetchGetAllProfessions } from "@/services/Profesiones/ProfesionesApiService";

export default async function RegisterPage() {
    const countries = await fetchGetAllCountries();
    const departamentsCuontries = await fetchGetAllDepartamentsCuontries();
    const municipios = await fetchGetAllMunicipios();
    const departamentsCompanie = await fetchGetAllDepartamentsCompanie();
    const professions = await fetchGetAllProfessions();
    //console.log(municipios.data);
    return (
        <FormikRegister
        dataCountries={countries.data}
        dataDepartamentsCuontries={departamentsCuontries.data}
        dataMunicipios={municipios.data}
        dataDepartamentsCompanie={departamentsCompanie.data}
        dataProfessions={professions.data}

        />
    )
}