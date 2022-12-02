import { Accordion, ListGroup, ListGroupItem } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";

function HomePage() {
    return (  
        <>
            <h1>Projekt "Lao väljastaja" </h1>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <AccordionHeader>Tutvustus</AccordionHeader>
                    <AccordionBody>
                        <p><b>Lao väljastaja</b> on projekt, mis on abiks müügi ja kauba komplekteerimisel firmas, mis kasutab majandustarkvarana <b>Standard Booksi</b>.</p>
                        
                        <h4>Töövoog:</h4>
                        <h5>Klienditeenindaja</h5>
                            <ul>
                                <li>Vormistab <b>Standard Booksis</b> tellimustele lähetused. See on protsess millega luuakse laole korraldus komplekteerida</li>
                                <li>Saab jälgida <b>Lao väljastaja</b> kaudu reaalset lao tööprotsessi</li>
                                <li>Vormistab <b>Standard Booksis</b> müügiarved ja saadab transporti</li>
                            </ul>
                        <h5>Lao töötaja</h5>
                        <ul>
                            <li>Laotöötaja kasutab ainult <b>Lao väljastajat</b></li>
                            <li>Saab lehitseda komplektreerimiste nimekirja</li>
                            <li>(osliselt) komplekteerib tellimustele
                                <ul>
                                    <li>kaalub</li>
                                    <li>sisetab käsitsi koguseid</li>
                                    <li>trükib etiketid</li>
                                </ul>
                            </li>
                            <li>vajadusel jätkab pooleliolevaid tellimusi</li>
                            <li>suunab tellimused tagasi klienditeeninajale</li>
                        </ul>
                        <h5>Lao töötaja töökomplekt</h5>
                        <ul>
                            <li>puutetundlik ekraan (seinale kinnitatud, kaasaskantav tahvel) nb! ilma klaviatuuri/hiireta</li>
                            <li>kaalud 
                                <ul>
                                    <li>fix punktd</li>
                                    <li>kõik terminalid peavad saama kasutada kõiki kaale risti rästi</li>
                                </ul>
                            </li>
                            <li>printerid (erinevad riistvarad kuna erinevad paberid, suurused,... jne)
                                <ul>
                                    <li>eriketi printer - Kauba etikettimiseks</li>
                                    <li>etiketi printer - pakendi varustamiseks kaubasedelitega</li>
                                </ul>
                            </li>
                        </ul>
                    </AccordionBody>
                </Accordion.Item>                    
                <Accordion.Item eventKey="1">
                    <AccordionHeader>Eeldused - välisühendused</AccordionHeader>
                    <AccordionBody>
                        <ListGroup>
                        <ListGroupItem>
                            <ListGroup>
                                <ListGroupItem variant="info"><h5>Books</h5></ListGroupItem>
                                <ListGroupItem variant="dark">&#128577; react fetch - ei õnnestunud. Usun, et mitte demo ver puhul on võimalik seadistada.</ListGroupItem>
                                <ListGroupItem variant="dark">&#128577; Backend PHP -&gt; Books API = &gt; Return PHP heder error</ListGroupItem>
                                <ListGroupItem variant="success">Backend PHP -&gt; Books API -&gt; extension (Cross Domain - CORS 0.2.3) - Books API demo ver on päringu saabumise aeg 1 min.</ListGroupItem>
                                <ListGroupItem variant="success">Backend PHP -&gt; offline -&gt; salvestatud ports staatilisi XML-e</ListGroupItem>
                                <ListGroupItem variant="success">Backend PHP =&gt; väljastab reacti töötlemata/kontrollimata XML'id mis on üle viidud JSON</ListGroupItem>
                            </ListGroup>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroup>
                                <ListGroupItem variant="info"><h5>Kaal -&gt; PHP</h5>radwag PUE 7.1</ListGroupItem>
                                <ListGroupItem variant="success">class kaalSocket - Tauri Tammaru</ListGroupItem>
                                <ListGroupItem variant="success">Hetkel tagastab ainult kaalu.</ListGroupItem>
                                <ListGroupItem variant="warning">Taara, Nullimine</ListGroupItem>
                                <ListGroupItem variant="warning">Offline</ListGroupItem>
                            </ListGroup>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroup>
                                <ListGroupItem variant="info"><h5>Väline DB</h5>Info mis on ainult komplekteerijatel ja ei saa säilitada Booksis</ListGroupItem>
                                <ListGroupItem variant="warning">Backend PHP API -&gt;
                                <ul>
                                    <li>lähetuse staatuses <ul>
                                        <li>alustamata</li>
                                        <li>töös - avatud kellegi terminalis nn. lipp aktiivne</li>
                                        <li>poolik - tellimus osaliselt komplekteeritud </li>
                                        <li></li>
                                        <li></li>

                                    </ul>
                                         poolik lõppenud, lõppenud, suletud - Books kinnitatud</li>
                                    <li>Lipp "aktiivne" - (hea oleks kui selle saaks teha Books "Muuda" kaudu) </li>

                                </ul>
                                </ListGroupItem>
                            </ListGroup>
                        </ListGroupItem>
                        
                        </ListGroup>
                    </AccordionBody>
                </Accordion.Item>
                <AccordionItem eventKey="2">
                    <AccordionHeader >Tegevused</AccordionHeader>
                    <AccordionBody>
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroup>
                                <ListGroupItem variant="info"><h5>Lähetuste nimekiri</h5></ListGroupItem>
                                <ListGroupItem variant="success">Kuvab nimekirja kus on read võimalik avadaja sulgeda</ListGroupItem>
                                <ListGroupItem variant="success">Võimalik minna ühte töötlema</ListGroupItem>
                                <ListGroupItem variant= "success" >Filtrid 
                                    <ul>
                                        <li>kuupäevad</li>
                                        <li>on kinnitatud</li>
                                    </ul>
                                </ListGroupItem>
                                <ListGroupItem variant="warning">
                                    Lisada filtrid
                                    <ul>
                                        <li>Staatus</li>
                                        <li>Nimi</li>
                                    </ul>
                                </ListGroupItem>
                                <ListGroupItem variant= "warning"> Sorteenimine
                                    <ul>
                                        <li>Algsorteering - default: raskemad enne</li>
                                        <li>Nimi</li>
                                    </ul>
                                    </ListGroupItem>
                            </ListGroup>
                            <ListGroup>
                                <ListGroupItem variant="info"><h5>Lähetus</h5></ListGroupItem>
                                <ListGroupItem variant="success">Lähetuste vaade</ListGroupItem>
                                <ListGroupItem variant="warning">Lähetuste vaade - korrektne vastus aga tühi</ListGroupItem>
                                <ListGroupItem variant="success">Liikumine ühe rea vaatesse</ListGroupItem>
                                <ListGroupItem variant="warning">read värvida vastavalt staatusele (backend BD + Books OkFlag). komplekteerimata, komplekteeritud, poolik, </ListGroupItem>
                                <ListGroupItem variant="warning">Pakendite transpordi etiketid
                                <ul>
                                    <li>salvestamine eraldi +,-,õ pakendite kogus</li>
                                    <li>pakendi etiketide trükkimine. peab olema võimalus lisada andmerid: (+&#8451;/-&#8451;/õrn/...) (mitu) / (mitmest)</li>
                                </ul>
                                </ListGroupItem>
                            </ListGroup>
                            <ListGroup>
                                <ListGroupItem variant="info"><h5>Lähetuse rida</h5></ListGroupItem>
                                <ListGroupItem variant="success">ühe rea vaade</ListGroupItem>
                                <ListGroupItem variant="success">võimalus valida kaalumine/klaviatuur</ListGroupItem>
                                <ListGroupItem variant="warning"></ListGroupItem>
                                <ListGroupItem variant="warning"></ListGroupItem>
                            </ListGroup>
                            <ListGroup>
                                <ListGroupItem variant="info"><h5>Kaalumine</h5></ListGroupItem>
                                <ListGroupItem variant="success">Kaalu vaade</ListGroupItem>
                                <ListGroupItem variant="success">nupud - kaalu</ListGroupItem>
                                <ListGroupItem variant="warning">(!) Pidev kaalu näit
                                <ul>
                                    <li>näit peab olemas olema kui vaja vs resursi kasutus mõistlikus</li>
                                    <li>kaal ei tohi olla hõivatud ühe terminali poolt</li>
                                </ul>
                                 </ListGroupItem>
                                <ListGroupItem variant="warning">nupud - nulli/taara/tagasi sisestuseta</ListGroupItem>
                                <ListGroupItem variant="warning">nupp - trüki etikett -&gt; (võtab kaalu, lisab rea ja (!)kohe trükib) </ListGroupItem>
                                <ListGroupItem variant="warning">Kaalu valik sh "offline" -&gt; küsime backendist</ListGroupItem>
                            </ListGroup>
                            <ListGroup>
                                <ListGroupItem variant="info"><h5>Klaviatuur</h5></ListGroupItem>
                                <ListGroupItem variant="success">Klaviatuuri vaade</ListGroupItem>
                                <ListGroupItem variant="success">nupud 0-9, Backspace, enter</ListGroupItem>
                                <ListGroupItem variant="success">lisame logisse</ListGroupItem>
                            </ListGroup>
                            <ListGroup>
                                <ListGroupItem variant="info"><h5>Kaalumiste logi</h5>Kasutatav nii kaalumise kui ka käsitsi siestamise korral nähtav ka  </ListGroupItem>
                                <ListGroupItem variant="success">Vaade: kaalumiste Logi</ListGroupItem>
                                <ListGroupItem variant="success">vaade peab olema vaadeldav, Lähetuse rea(parent), kaalumise , klaviatuuri vaatega samaaegselt</ListGroupItem>
                                <ListGroupItem variant="success">nupp: logist ühe elemendi kustutamine</ListGroupItem>
                                <ListGroupItem variant="warning">nupp: logist ühe elemendi etiketi printimine</ListGroupItem>
                                <ListGroupItem variant="success">logi on elus kuni lähetuse rea sisestamiseni?</ListGroupItem>
                            </ListGroup>
                            <ListGroup>
                                <ListGroupItem variant="info" ><h5>Eriketi pritimine</h5></ListGroupItem>
                                <ListGroupItem variant="warning">Kujundus:</ListGroupItem>
                                <ListGroupItem variant="warning">(kaalu)triipkood</ListGroupItem>
                                <ListGroupItem variant="warning">(!)kasutajasõbralik printimine </ListGroupItem>
                            </ListGroup>
                        </ListGroupItem>
                    </ListGroup>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
            
        </>
    );
}

export default HomePage;