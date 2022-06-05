# Introduzione

## Standard e interoperabilità
- La prima informatica era contenta di un'applicazione che funzionasse e basta
- Con il tempo si sono introdotti concetti di qualità oltre al funzionamento
- **INTEROPERABILITÀ**: il programma deve funzionare con altri programmi dello stesso tipo
- Bisogna anche identificare degli standard appropriati e implementarli correttamente

## Mashup
- Capacità di unire linguaggi, protocolli, librerie, ecc. per creare qualcosa di complesso a partire da componenti semplici

## Dichiaratività
- La progettazione dichiarativa descrive stati iniziali e finali di un mondo astratto
  - Un meccanismo esistente genera la computazione che permette la transizione dallo stato iniziale al finale
  - Un errore porta ad uno stadio finale non desiderato, non ad un'interruzione

## Semanticità
- Le informazioni sul web hanno significato, un'applicazione che ne trae vantaggio collega e rende eseguibili informazioni semantiche non in "plain text"

## Accessibilità
- Il web rappresenta un mezzo di comunicazione universale, perciò è importante renderlo accessibile a tutti
- Soprattutto per persone con un qualche tipo di disabilità, ma anche persone in condizioni di disabilità temporanea

## Framework
- Librerie che rendono più ricco, sofisticato e semplice l'uso di una tecnologia, come un linguaggio (client/server-side) o le specifiche grafiche di una pagina web

## API
- Librerie, protocolli e strumenti per utilizzare algoritmi e servizi messi a disposizione da un software da parte di un altro software
- Si ricorre ad esse per integrare più servizi in un'applicazione più ricca e potente di quelle utilizzate come base

### API REST
- RESTful API, sfruttano la natura di HTTP e degli URI
- Forniscono:
  - Un *URI* base a cui accedere ai servizi
  - Una *sintassi* degli URI delle entità interrogabili e modificabili
  - Un *media type* attraverso cui ottenere e fornire dati da utilizzare nei servizi forniti
  - Una *semantica* associata ai verbi HTTP (GET, PUT, POST, DELETE)

### API di servizi locali
- Permettono ad applicazioni web di accedere a servizi offerti dal device locale, come telecamera, microfono, geolocalizzazione, ecc

# I set di caratteri
Il problema della codifica dei caratteri

Digitalizzare un dato significa associarvi un numero. Digitalizziamo separatamente ogni componente
- Per un testo ogni singolo carattere
- Per le immagini ogni pixel

Il problema non si pone per i protocolli stessi, ma per il loro contenuto

I diversi alfabeti hanno diversi caratteri, che hanno generato problemi negli anni

## ASCII
***American Standard Code for Information Interchange***

Standard che definisce valori per 128 caratteri, nello standard originale su 8 bit il primo non è rilevante e viene usato come bit di parità

## ISO 8859/1 (ISO Latin 1)
È l'estensione standard (usa tutti gli 8 bit) e comprende un certo numero di caratteri di lingue europee

È usato automaticamente da HTTP e da alcuni OS

Retrocompatibile con ASCII

C'è però necessità di uno standard internazionale

## UNICODE (UCS)
Standard internazionale in uso oggi

- **Repertorio universale**
  - Tutti i caratteri di tutti gli alfabeti
- **Efficenza**
  - Raggruppamenti, allineamento e assenza di shift per uso di memorià e velocità di parsing
- **Caratteri, non glifi**
  - I font sono completamente esclusi
- **Semantica**
  - Ogni carattere possiede un significato specifico, anche se graficamente sono quasi uguali
- **Testo semplice**
  - Niente bold o alterazioni grafiche
- **Ordine logico**
  - Le sottosequenze di un alfabeto seguono l'ordine dell'alfabeto stesso
- **Unificazione**
  - Caratteri comuni a linguaggi diversi, se possibile, vengono unificati in un singolo codice
- **Composizione dinamica**
  - Alcuni caratteri sono composizione di frammenti indipendenti, questi frammenti hanno codici indipendenti e vengono creati per composizione
- **Stabilità**
  - I codici, una volta assegnati, non possono essere più rimossi
- **Convertibilità**
  - Facile meccanismo di conversione tra Unicode e altre codifiche precedenti

Avere tutti i caratteri permette di usare un unico standard dei caratteri online, ma ovviamente se scriviamo in Italia avere tutti i caratteri cinesi non sarà molto utile

Per esempio, UCS-2 usa 2 byte, UCS-4 usa 4 byte

## UTF
***Unicode Transformation Format***
È un sistema a lunghezza variabile che permette di accedere a tutti i caratteri di UCS in maniera più efficente

UTF-8 permette di accedere a tutti i caratteri definiti da UCS-4, ma utilizza una lunghezza variabile
- I codici ASCII a 7 bit richiedono un byte, mettendo a 0 il primo bit
  - Primo bit 0
- I codici per caratteri latini e script non ideografici richiedono 2 byte
  - Primi 2 bit 1
  - Ad ogni byte seguente i primi due bit sono 10
- I codici ideografici orientali richiedono 3 byte
  - Primi 3 bit 1
  - Ad ogni byte seguente i primi due bit sono 10
- Il resto 4 byte
  - Primi 4 bit 1
  - Ad ogni byte seguente i primi due bit sono 10

Convertire da ISO Latin 1 a UTF e viceversa può generare problemi. Infatti ISO Latin 1 usa sempre 1 byte, mentre UTF può usarne 2 per alcuni caratteri latini

# Content encoding
## Escaping
Il carattere proibito viene preceduto o sostituito da una sequenza di caratteri speciali
- `String c = "Questa stringa \"contiene\" caratteri speciali`
  - String c = "Questa stringa \"contiene\" caratteri speciali
- `<p>Questa stringa &quot;contiene&quot; caratteri speciali</p>`
  - <p>Questa stringa &quot;contiene&quot; caratteri speciali</p>

## Encoding
Il carattere proibito viene rappresentato numericamente con il suo codice naturale secondo una sintassi speciale
- `"felicit\u00E0"`
- `<p>felicit&#x00E0;</p>`
- `<p>felicit&#224;</p>`

## SMTP
***Simple Mail Transfer Protocol***
Uno dei protocolli TCP/IP più antico e ancora usato (1982)

Protocollo text-based, per scambio di messaggi di posta e la verifica dei destinatari dei messaggi

Una connessione SMTP è composta da un'apertura, una o più sequenze di comandi e da una chiusura

Limiti:
- Lunghezza massima del messaggio da 1 Mb
- Solo caratteri ASCII a 7 bit

Quindi non si possono trasferire documenti binari

**MIME** permette di bypassare questi limiti

## MIME
***Multipurpose Internet Mail Extensions***

MIME ridefinisce il formato del corpo di RFC 822 per permettere:
- Messaggi di testo con altri set di caratteri
- Messaggi non testuali
- Messaggi multi parte

Un messaggio MIME viene convertito in più messaggi SMTP compatibili per viaggiare, all'arrivo viene decodificato

    Eventualmente aggiungere altro

# Uniform Resource Identifier (URI)

**Identificazione**: Il WWW è uno spazio informativo in cui ogni elemento di interesse è chiamato risorsa ed è indentificato da un URI

**Interazione**: Un protocollo di comunicazione chiamato HTTP permette di scambiare messaggi su una rete informtica (TCP/IP)

**Formato**: Diversi formati, come XHTML, PNG, RDF, ecc.

Una **risorsa** è qualunque struttura che sia oggetto di scambio tra applicazioni all'interno del WWW

Nota: risorsa != file

Attraverso gli URI, il WWW è stato in grado di identificare risorse accessibili tramite il proprio protocollo, HTTP, e tramite tutti gli altri (FTP, ecc.). Il vantaggio rispetto ad altri sistemi è la sintassi universale, indipendente dal protocollo e facilmente memorizzabile

Gli URI si dividono in due gruppi:
- Uniform Resource Locatior (**URL**): contiene informazioni immediatamente utilizzabili per accedere alla risorsa (es. il suo indirizzo di rete)
- Uniform Resource Names (**URN**): permette un'etichettatura permanente e non ripudiabile della risorsa

Gli URL sono fragili, nel caso di cambio del nome di una directory non sono più validi

Gli URN sono stabili, ma vanno trasformati in URL per una ricerca, c'è una mappa che si aggiorna ad ogni modifica di una risorsa per fare ciò

Nella visione classica i due insiemi erano disgiunti, oggi invece la distinzione è secondaria
- Esempio: le coordinate geografiche sono sia un URL che un URN

## Sintassi
Gli URI sono progettati per:
- Essere trascrivibili: sequenze di caratteri tratti da un set limitato
- Fornire identificazione, non interazione: le operazioni eseguibli sulle risorse non sono indicate negli URI, ma nell'interpretazione che si fa di essi
- Fornire spazi di nomi organizzati gerarchicamente: Diverse parti divise da caratteri come ":", "/", "?" e "#"

Un URI è diviso in questo modo

`URI = schema : [// authority] path [? query] [# fragment]`
- **schema**: Negli URL è il protocollo (Es. http, ftp, https, mailto)
- **authority**: individua un'organizzazione gerarchica dello spazio dei nomi a cui sono delegati
  - A sua volta divisa in: `authority = [userinfo @] host [: port]
    - *userinfo* non deve essere per forza presente
    - *host* è il nome di un dominio o un indirizzo IP
    - *post* può essere omessa se si riferisce ad una well-known port
- **path**: parte identificativa della risorsa
- **query**: individua un'ulteriore specificazione della risorsa, solitamente per avere un risultato dinamico
- **fragment**: individua una risorsa secondaria

### Caratteri ammessi negli URI
Possono essere unreserved, reserved o escaped

#### Unreserved
Alfanumerici e punteggiatura privi di ambiguità

#### Reserved
Caratteri che hanno funzioni particolari, come ?, ;, /, &, ecc.

#### Escaped
- Per usarli è necessario usare %XX, dove XX è il codice esadecimale del carattere, sono:
  - Caratteri non US-ASCII
  - Caratteri di controllo
  - { } | \ ^ [ ] `
  - Delimitatori: spazio, <, >, #, %
  - Altri caratteri riservati

### Route
Associazione del *path* di un URI ad una risorsa gestita o restituita da un serber web.

- **Managed route**: il server associa ogni URI ad una risorsa attraverso il file system locale oppure generate attraverso una computazione
  - Approccio moderno, node.js ed express.js
- **File-system route**: il server associa la radice della parte *path* ad una directory del file system locale e ogni filename valido all'interno di quella directory genera un URI
  - Vecchio approccio

## URI references
Un URI assoluto contiene tutte le parti predefinite dal suo schema, esplicitamente precisate

Un URI gerarchico può però anche essere relativo, ed in questo caso riporta una parte dell'URI assoluto

Esempio: `pippo.html` dentro al documento di URI `http://www.sito.com/uno/due/pluto.html` fa riferimento a `http://www.sito.com/uno/due/pippo.html`

### Operazioni sugli URI
#### **URI Resolution**
Generazione dell'URL assouto corrispondente all'URI
Si esegue quando l'URI è una URI reference oppure un URI a cui non corrisponde una risorsa fisica
- Input: un URI - Output: un URI

#### **URI Dereferencing**
La fornitura della risorsa identificata dall'URI (Es. Il documento cercato)
- Input: un URL - Output: una risorsa

### Risolvere una URI reference
Risolvere un URI relativo avviene come segue

Dato l'URI di base `http://www.site.com/dir1/doc1.html`

| Input                                |  Risoluzione |
| :---                                 | :--- |
| `#anchor1`                           | `http://www.site.com/dir1/doc1.html#anchor1` |
| `http://www.site.com/dir2/doc2.html` | `http://www.site.com/dir2/doc2.html` |
| `/dir3/doc3.html`                    | `http://www.site.com/dir3/doc3.html` |
| `doc4.html`                          | `http://www.site.com/dir1/doc4.html` |
| `dir5/doc5.html`                     | `http://www.site.com/dir1/dir5/doc5.html` |
| `./doc6.html`                        | `http://www.site.com/dir1/doc6.html` |
| `../doc7.html`                       | `http://www.site.com/doc7.html` |

### Schemi HTTP e HTTPS
HTTPS differisce da HTTP per una crittografazione in entrambi i sensi, per il resto è uguale

#### **Sintassi**
`http://host[:port]/path[?query][#fragment]`

### Schema FILE
Dà accesso ai file di un file system locale

#### **Sintassi**
`file://host/path[#fragment]`

### Schema DATA
Schema non gerarchico, non fa riferimento ad una risorsa ma **contiene** una risorsa: tutti i dati sono inseriti nell'URI

#### **Sintassi**
`data:[<media type>][;base64];<data>`

Esempio: `data:text/plain;charset=UTF-8;some%20text%20for%20you`

### Schema FTP
File Trasfer Protocol

#### **Sintassi**
`ftp://[user[:password]@]host[:port]/path`

Dove:
- *User* e *Password* sono le credenziali per l'accesso al server FTP
  - Scarsa sicurezza, password in chiaro nell'URI
- *Host*, *port* e *path* sono l'indirizzo del server, la porta di connessione e il nome dell'oggetto ricercato, come per HTTP. La porta di default è 21

### URI che iniziano con //
Un URI reference può iniziare con un nome dominio:

    //www.sito.com/dir1/dir2/fig1.gif

Vuol dire quindi: "carica l'immagine `fig1.gif` utilizzando lo stesso protocollo della pagina HTML: HTTP se siamo fuori dall'area protetta o HTTPS se siamo dentro l'area protetta

### Content Delivery Network (CDN)

Ogni utente che naviga su molti siti web, che usano le stesse librerie ma non le prendono da un CDN deve scaricare tutte le volte gli stssi identici file.

Se invece questi siti fanno riferimento a librerie sullo stesso CDN, l'utente può usare le librerie scaricate una sola volta e mantenute in cache

### URL permanenti
Esistono schemi di URL che forniscono le garanzie richieste ad un URL per essere un URN. Un esempio è il PURL (Permanent URL)

L'accesso avviene per *derefenziazione* o per *redirezione*

### URL rewriting
Trasforma un URI visibile in un URL fisico sulla base di regole
- Esempio: `http://example.com/wiki/index.php?title=Argomento` può essere esposto come `http://example.com/Argomento`

Vantaggi
- Permette di nascondere dettagli sull'implementazione
- Permette di realizzare sistemi di nomi perduranti oltre la vita utile del software utilizzato

### URL shortener
Permettono di creare URL molto brevi a partire da URL lunghi. È un semplice rewriter

Esempi: bit.ly, tr.im, goo.gl

### application/x-www-form-urlencoded
È un'estensione della codifica degli URI applicata anche a risorse trasmesse su canale HTTP
- codici non alfanumerici -> `%XX`
- spazi -> `+`
- nomi dei controlli separati da `&`
- valore separato dal nome da `=`

Esempio, la parte queri di un URI usa questo formato *urlencoded*

### IRI
Internationalized Resource Identifier, fornisce una sintassi per inserire i caratteri di UCS-4 (UTF-8) in un URI e risolverli.

Per funzionare però c'è bisogno dei IDN

### IDN/IDNA
Internazionalized Domain Name for Application (IDN/IDNA), standart per estendere i nomi di dominio a tutti i caratteri non ASCII di Unicode

#### **Rischi**
Caratteri in cirillico sono estremamente simili a caratteri latini, possibilità di frodi

### CURIE
Compact URI, un modo per esprimere in maniera compatta famiglie di URI che condividono lo stesso prefisso

Esempio: Dato `dom="http://www.dominio.com/"`, con `[dom:doc1]` intendiamo `http://www.dominio.com/doc1`

### Linked Data
Collezione di dati leggibili sia da umani che da software. La collezione deve:
- Usare URI per identificare oggetti
- Usare HTTP URI per la ricerca
- Fornire informazioni utili sull'oggetto quando la sua URI è dereferenziata (Es. RDF)
- Includere link ad altre URI relative ai dati esposti per migliorare la ricerca di altre informazioni relative nel Web

### Linked Open Data (LOD)
Linked data di tipo aperto, utilizzabili da tutti. Sono usati molto da organizzazioni politiche per campagne

# HyperText Transfer Protocol (HTTP)
Procollo **client-server**, **generico** e **stateless** utilizzato non solo per lo scambio di documenti Web ma in molte applicazioni distribuite
- **Client-server**: il client attiva la connessione, il server la accetta e risponde, alla fine chiude la connessione
- **Generico**: indipendente dal formato dei dati con cui vengono trasmesse le risorse
- **Stateless**: il client ricrea da zero il contesto necessario al server per rispondere

## Risorse HTTP
HTTP permette lo scambio di risorse identificate da URI

Separa le risorse dallal loro rappresentazione

Implementa politiche di caching che permettono di memorizzare copie delle risorse sui server (proxy, gateway, etc.) coinvolti nella trasmissione e controllare la validità di queste copie