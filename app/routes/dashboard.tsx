import Filters from '~/components/filters';
export default function Dashboard() {
    return(
        <main>
            <Filters/>
        </main>
    )
}

//eingeloggt als: <? echo $_SESSION['LoginUsername']; ?><br><br>
//Profil: <? echo $_SESSION['Profil']; ?></br
//  if($_POST["eroeffnet"]==1) 
//</br>{$sql = "begin AKTENKONTROLLE.GetNeueAkten(:Login, :Status, :ZeitVon, :ZeitBis, :Typ, :Produkt, :MA, :ProcCurs, :DBError); end;";
//} else {
//  $sql = "begin AKTENKONTROLLE.GetBearbeiteteAkten(:Login, :Status, :ZeitVon, :ZeitBis, :Typ, :Produkt, :MA, :ProcCurs, :DBError); end;";
//}