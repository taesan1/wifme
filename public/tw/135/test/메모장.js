/*
 * Script Name: Incomings Overview
 * Version: v2.5.0
 * Last Updated: 2023-08-21
 * Author: RedAlert
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: t14466468
 * Approved Date: 2020-01-09
 * Mod: JawJaw
 */

/*--------------------------------------------------------------------------------------
 * This script can NOT be cloned and modified without permission from the script author.
 --------------------------------------------------------------------------------------*/

var scriptData = {
    prefix: 'incomingsOverview',
    name: 'Incomings Overview',
    version: 'v2.5.0',
    author: 'RedAlert',
    authorUrl: 'https://twscripts.dev/',
    helpLink:
        'https://forum.tribalwars.net/index.php?threads/incomings-overview.286459/',
};

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;
if (typeof NOBLE_GAP === 'undefined') NOBLE_GAP = 100;
if (typeof FORMAT === 'undefined') FORMAT = ' %unit% | %sent%';
if (typeof CHECK_ALL_PAGES === 'undefined') CHECK_ALL_PAGES = false;

// Local Storage
var LS_PREFIX = `${scriptData.prefix}`;
var TIME_INTERVAL = 60 * 60 * 1000 * 24 * 1; /* fetch data every 1 day */
var LAST_UPDATED_TIME = localStorage.getItem(`${LS_PREFIX}_last_updated`) ?? 0;

var unitInfo;

var units = {
    spear: 'spear',
    sword: 'sword',
    axe: 'axe',
    archer: 'archer',
    spy: 'spy',
    light: 'lcav',
    marcher: 'marcher',
    heavy: 'hcav',
    ram: 'ram',
    cat: 'cat',
    snob: 'noble',
};

var coordsRegex = /\d{1,3}\|\d{1,3}/g;

// Translations
var translations = {
    en_DK: {
        'Incomings Overview': 'Incomings Overview',
        Help: 'Help',
        'It seems like you have no incomings ��':
            'It seems like you have no incomings ��',
        'Total Incomings:': 'Total Incomings:',
        'Attacking Players:': 'Attacking Players:',
        'Total Attacking Players:': 'Total Attacking Players:',
        'Destination Villages Count:': 'Destination Villages Count:',
        'Origin Villages Count:': 'Origin Villages Count:',
        'Destination Villages': 'Destination Villages',
        'Origin Villages': 'Origin Villages',
        'Export Incomings Data': 'Export Incomings Data',
        'Highlight Possible Nobles': 'Highlight Possible Nobles',
        Village: 'Village',
        Count: 'Count',
        'Toggle Combinations': 'Toggle Combinations',
        'Possible nobles are highlighted!': 'Possible nobles are highlighted!',
        'No possible nobles were found!': 'No possible nobles were found!',
        Watchtower: 'Watchtower',
        'Attack:': 'Attack:',
        'Small Attack:': 'Small Attack:',
        'Medium Attack:': 'Medium Attack:',
        'Large Attack:': 'Large Attack:',
        'Contains Nobleman:': 'Contains Nobleman:',
        'Destination Villages List': 'Destination Villages List',
        'Destination Villages Coords': 'Destination Villages Coords',
        'Origin Villages List': 'Origin Villages List',
        'Origin Villages Coords': 'Origin Villages Coords',
        'Last updated at:': 'Last updated at:',
        'Mass Tag Incomings': 'Mass Tag Incomings',
        'Tagging incomings ...': 'Tagging incomings ...',
        'Watchtower Timer': 'Watchtower Timer',
        'Watchtower Timer script initialized ...':
            'Watchtower Timer script initialized ...',
        'Current world does not support watchtower!':
            'Current world does not support watchtower!',
        'Watchtower Timer script is already initialized!':
            'Watchtower Timer script is already initialized!',
        'Create New Forum Thread': 'Create New Forum Thread',
        'Create New Mail': 'Create New Mail',
        Overview: 'Overview',
        Map: 'Map',
        Fetch: 'Fetch',
        'Village data could not be fetched!':
            'Village data could not be fetched!',
        Support: 'Support',
        'OP Spotter': 'OP Spotter',
        'Landing Time': 'Landing Time',
        'Own Villages Info': 'Own Villages Info',
        'Own Villages': 'Own Villages',
        'Enemy Villages': 'Enemy Villages',
        'Redirecting to Incomings page...': 'Redirecting to Incomings page...',
        'There was an error parsing the incomings list!':
            'There was an error parsing the incomings list!',
        'Fake Finder': 'Fake Finder',
        'Find Fakes': 'Find Fakes',
        'Fakes where found!': 'Fakes where found!',
        'No fakes where found!': 'No fakes where found!',
        'Add Backtime': 'Add Backtime',
        'Backtime was added on incoming label!':
            'Backtime was added on incoming label!',
        'All incomings have backtime already added!':
            'All incomings have backtime already added!',
        'Tag incomings before adding backtimes!':
            'Tag incomings before adding backtimes!',
        'tomorrow at': 'tomorrow at',
        'Mark Duplicates': 'Mark Duplicates',
        'No duplicate incomings found!': 'No duplicate incomings found!',
        'Renaming ...': 'Renaming ...',
    },
    el_GR: {
        'Incomings Overview': '��菅�觀��管�管 �菅�琯���關琯館�館 ��菅罐串�琯�館',
        Help: '�恝冠罐琯菅慣',
        'It seems like you have no incomings 챨타���':
            '�琯館 琯�琯菅� 琯菅�琯���關琯館琯� 琯�菅罐串�琯菅�',
        'Total Incomings:': '誇�館恝貫菅觀串� �菅�琯���關琯館琯�:',
        'Attacking Players:': '��菅�菅罐串關琯館恝菅 �慣官觀�琯�:',
        'Total Attacking Players:': '誇�館恝貫恝 ��菅�菅罐串關琯館�館 �慣菅觀��館:',
        'Destination Villages Count:': '��菅罐關�� 鍋��菅�館 ��恝恝�菅�關恝�:',
        'Origin Villages Count:': '��菅罐關�� 鍋��菅�館 ��恝串貫琯��管�:',
        'Destination Villages': '��恝恝�菅�關�� ��菅罐串�琯�館',
        'Origin Villages': '��恝串貫琯��管 ��菅罐串�琯�館',
        'Export Incomings Data': '�刮慣款�款冠 �琯灌恝關串館�館',
        'Highlight Possible Nobles': 'Highlight �菅罐慣館恝�� ��菅��恝��',
        Village: '鍋��菅�',
        Count: '�恝�關琯�恝',
        'Toggle Combinations': '誇�館灌�慣��菅觀冠 ��恝棺恝貫冠',
        'Possible nobles are highlighted!':
            '�菅罐慣館恝官 ��菅��恝菅 琯菅館慣菅 highlighted!',
        'No possible nobles were found!': '�琯館 棺�串罐管觀慣館 �菅罐慣館恝官 ��菅��恝菅!',
        Watchtower: '�慣�慣�管�管�管�菅恝',
        'Attack:': '��官罐琯�管:',
        'Small Attack:': '�菅觀�冠 ��官罐琯�管:',
        'Medium Attack:': '�琯�慣官慣 ��官罐琯�管:',
        'Large Attack:': '�琯款郭貫管 ��官罐琯�管:',
        'Destination Villages List': '�官��慣 鍋��菅�館 ��恝恝�菅�關恝�',
        'Destination Villages Coords': '誇�館�琯�慣款關串館琯� 鍋��菅�館 ��恝恝�菅�關恝�',
        'Origin Villages List': '�官��慣 鍋��菅�館 ��恝串貫琯��管�',
        'Origin Villages Coords': '誇�館�琯�慣款關串館琯� 鍋��菅�館 ��恝串貫琯��管�',
        'Last updated at:': '課琯貫琯��慣官慣 琯館管關琯��罐管觀琯 ��菅�:',
        'Mass Tag Incomings': '�慣瓘菅觀冠 �琯�恝館恝關慣�官慣',
        'Tagging incomings ...': '�琯�恝館恝關郭瓘琯菅 �菅�琯���關琯館琯� ��菅罐串�琯菅� ...',
        'Watchtower Timer': '鍋��館恝� �慣�慣�管�管�管�官恝�',
        'Watchtower Timer script initialized ...':
            '課恝 script �恝� �慣�慣�管�管�冠�菅恝� 郭��菅�琯 ...',
        'Current world does not support watchtower!':
            '� 觀��關恝� 灌琯館 琯�琯菅 �慣�慣�管�管�冠�菅慣!',
        'Watchtower Timer script is already initialized!':
            '課恝 script �恝� �慣�慣�管�管�管�官恝� ��串�琯菅 管灌管!',
        'Create New Forum Thread': '過�菅郭刮琯 過恝�恝�關 Post',
        'Create New Mail': '誇�館�慣刮琯 ��館管關慣',
        Overview: '��菅�觀��管�管',
        Map: '鍋郭��管�',
        Fetch: '�貫管�恝�恝�官琯�',
        'Village data could not be fetched!':
            '課慣 灌琯灌恝關串館慣 �恝� ���菅恝� 灌琯館 棺�串罐管觀慣館!',
        Support: '跨�恝��冠�菅刮管',
        'OP Spotter': '�館�恝�菅�關�� ��菅罐串�琯�館',
        'Landing Time': 'Landing Time',
        'Own Villages Info': 'Own Villages Info',
        'Own Villages': 'Own Villages',
        'Enemy Villages': 'Enemy Villages',
        'Redirecting to Incomings page...': 'Redirecting to Incomings page...',
        'There was an error parsing the incomings list!':
            'There was an error parsing the incomings list!',
        'Fake Finder': 'Fake Finder',
        'Find Fakes': 'Find Fakes',
        'Fakes where found!': 'Fakes where found!',
        'No fakes where found!': 'No fakes where found!',
        'Add Backtime': 'Add Backtime',
        'Backtime was added on incoming label!':
            'Backtime was added on incoming label!',
        'All incomings have backtime already added!':
            'All incomings have backtime already added!',
        'Tag incomings before adding backtimes!':
            'Tag incomings before adding backtimes!',
        'tomorrow at': 'tomorrow at',
        'Mark Duplicates': 'Mark Duplicates',
        'No duplicate incomings found!': 'No duplicate incomings found!',
        'Renaming ...': 'Renaming ...',
    },
    pt_PT: {
        'Incomings Overview': 'Vista Geral de a chegar',
        Help: 'Ajuda',
        'It seems like you have no incomings 챨타���': 'Sem ataques a chegar',
        'Total Incomings:': 'Total de Ataques a chegar:',
        'Attacking Players:': 'Jogadores a atacar:',
        'Total Attacking Players:': 'Total de jogadores a atacar:',
        'Destination Villages Count:': 'Aldeias Alvo:',
        'Origin Villages Count:': 'Numero de Origem dos Ataques:',
        'Destination Villages': 'Destino dos Ataques',
        'Origin Villages': 'Origem dos Ataques',
        'Export Incomings Data': 'Exportar Dados dos Ataques',
        'Highlight Possible Nobles': 'Destacar Poss챠veis Nobres',
        Village: 'Aldeia',
        Count: 'Contagem',
        'Toggle Combinations': 'Ativar Combina챌천es',
        'Possible nobles are highlighted!': 'Possiveis Nobres Destacados',
        'No possible nobles were found!': 'N찾o foram encontrados nobres',
        Watchtower: 'Torre de Vigia',
        'Attack:': 'Ataque:',
        'Small Attack:': 'Ataque pequeno:',
        'Medium Attack:': 'Ataque Medio:',
        'Large Attack:': 'Ataque Grande:',
        'Destination Villages List': 'Lista de Aldeias de Destino',
        'Destination Villages Coords': 'Coordenadas de aldeias de destino',
        'Origin Villages List': 'Lista de Aldeias de Origem',
        'Origin Villages Coords': 'Coordenadas de aldeias de origem',
        'Last updated at:': 'Ultima Atualiza챌찾o:',
        'Mass Tag Incomings': 'Renomear em Massa',
        'Tagging incomings ...': 'A renomear ataques ...',
        'Watchtower Timer': 'Tempos da Torre de Vigia',
        'Watchtower Timer script initialized ...':
            'Script de Torre de Vigia iniciado ...',
        'Current world does not support watchtower!':
            'Mundo atual n찾o tem torre de vigia!',
        'Watchtower Timer script is already initialized!':
            'Script da Torre de Vigia j찼 foi iniciado!',
        'Create New Forum Thread': 'Criar mensagem no forum',
        'Create New Mail': 'Criar mensagem',
        Overview: 'Vista Geral',
        Map: 'Mapa',
        Fetch: 'Mostrar aldeia',
        'Village data could not be fetched!': 'Aldeia n찾o pode ser encontrada',
        Support: 'Apoio',
        'OP Spotter': 'Ataques por hora',
        'Landing Time': 'Hora de Chegada',
        'Own Villages Info': 'Own Villages Info',
        'Own Villages': 'Own Villages',
        'Enemy Villages': 'Enemy Villages',
        'Redirecting to Incomings page...': 'Redirecting to Incomings page...',
        'There was an error parsing the incomings list!':
            'There was an error parsing the incomings list!',
        'Fake Finder': 'Fake Finder',
        'Find Fakes': 'Find Fakes',
        'Fakes where found!': 'Fakes where found!',
        'No fakes where found!': 'No fakes where found!',
        'Add Backtime': 'Add Backtime',
        'Backtime was added on incoming label!':
            'Backtime was added on incoming label!',
        'All incomings have backtime already added!':
            'All incomings have backtime already added!',
        'Tag incomings before adding backtimes!':
            'Tag incomings before adding backtimes!',
        'tomorrow at': 'tomorrow at',
        'Mark Duplicates': 'Mark Duplicates',
        'No duplicate incomings found!': 'No duplicate incomings found!',
        'Renaming ...': 'Renaming ...',
    },
    pt_BR: {
        'Incomings Overview': 'Vista Geral de a chegar',
        Help: 'Ajuda',
        'It seems like you have no incomings 챨타���': 'Sem ataques a chegar',
        'Total Incomings:': 'Total de Ataques a chegar:',
        'Attacking Players:': 'Jogadores a atacar:',
        'Total Attacking Players:': 'Total de jogadores a atacar:',
        'Destination Villages Count:': 'Aldeias Alvo:',
        'Origin Villages Count:': 'Numero de Origem dos Ataques:',
        'Destination Villages': 'Destino dos Ataques',
        'Origin Villages': 'Origem dos Ataques',
        'Export Incomings Data': 'Exportar Dados dos Ataques',
        'Highlight Possible Nobles': 'Destacar Poss챠veis Nobres',
        Village: 'Aldeia',
        Count: 'Contagem',
        'Toggle Combinations': 'Ativar Combina챌천es',
        'Possible nobles are highlighted!': 'Possiveis Nobres Destacados',
        'No possible nobles were found!': 'N찾o foram encontrados nobres',
        Watchtower: 'Torre de Vigia',
        'Attack:': 'Ataque:',
        'Small Attack:': 'Ataque pequeno:',
        'Medium Attack:': 'Ataque Medio:',
        'Large Attack:': 'Ataque Grande:',
        'Destination Villages List': 'Lista de Aldeias de Destino',
        'Destination Villages Coords': 'Coordenadas de aldeias de destino',
        'Origin Villages List': 'Lista de Aldeias de Origem',
        'Origin Villages Coords': 'Coordenadas de aldeias de origem',
        'Last updated at:': 'Ultima Atualiza챌찾o:',
        'Mass Tag Incomings': 'Renomear em Massa',
        'Tagging incomings ...': 'A renomear ataques ...',
        'Watchtower Timer': 'Tempos da Torre de Vigia',
        'Watchtower Timer script initialized ...':
            'Script de Torre de Vigia iniciado ...',
        'Current world does not support watchtower!':
            'Mundo atual n찾o tem torre de vigia!',
        'Watchtower Timer script is already initialized!':
            'Script da Torre de Vigia j찼 foi iniciado!',
        'Create New Forum Thread': 'Criar mensagem no forum',
        'Create New Mail': 'Criar mensagem',
        Overview: 'Vista Geral',
        Map: 'Mapa',
        Fetch: 'Procurar por',
        'Village data could not be fetched!': 'Aldeia n찾o pode ser encontrada',
        Support: 'Apoio',
        'OP Spotter': 'Ataques por hora',
        'Landing Time': 'Hora de Chegada',
        'Own Villages Info': 'Own Villages Info',
        'Own Villages': 'Own Villages',
        'Enemy Villages': 'Enemy Villages',
        'Redirecting to Incomings page...': 'Redirecting to Incomings page...',
        'There was an error parsing the incomings list!':
            'There was an error parsing the incomings list!',
        'Fake Finder': 'Fake Finder',
        'Find Fakes': 'Find Fakes',
        'Fakes where found!': 'Fakes where found!',
        'No fakes where found!': 'No fakes where found!',
        'Add Backtime': 'Add Backtime',
        'Backtime was added on incoming label!':
            'Backtime was added on incoming label!',
        'All incomings have backtime already added!':
            'All incomings have backtime already added!',
        'Tag incomings before adding backtimes!':
            'Tag incomings before adding backtimes!',
        'tomorrow at': 'tomorrow at',
        'Mark Duplicates': 'Mark Duplicates',
        'No duplicate incomings found!': 'No duplicate incomings found!',
        'Renaming ...': 'Renaming ...',
    },
    es_ES: {
        'Incomings Overview': 'Entrantes',
        Help: 'Ayuda',
        'It seems like you have no incomings 챨타���':
            'Parece que no tienes entrantes',
        'Total Incomings:': 'Total de Ataques entrantes:',
        'Attacking Players:': 'Jugadores atacantes:',
        'Total Attacking Players:': 'Total de jugadores atacantes:',
        'Destination Villages Count:': 'Numero de Pueblos Objetivo:',
        'Origin Villages Count:': 'Numero de Pueblos de Origen:',
        'Destination Villages': 'Destino de Ataques',
        'Origin Villages': 'Pueblos de origen de Ataques',
        'Export Incomings Data': 'Exportar Datos de Ataques',
        'Highlight Possible Nobles': 'Destacar Posibles Nobles',
        Village: 'Pueblo',
        Count: 'Contagem',
        'Toggle Combinations': 'Cambiar combinaciones',
        'Possible nobles are highlighted!': 'Posibles Nobles destacados',
        'No possible nobles were found!': 'No se encontraron posibles nobles',
        Watchtower: 'Torre de vigilancia',
        'Attack:': 'Ataque:',
        'Small Attack:': 'Ataque Peque챰o:',
        'Medium Attack:': 'Ataque Mediano:',
        'Large Attack:': 'Ataque Grande:',
        'Destination Villages List': 'Lista de Pueblos Objetivo',
        'Destination Villages Coords': 'Coordenadas de Pueblos Objetivo',
        'Origin Villages List': 'Lista de Pueblos de Origen ',
        'Origin Villages Coords': 'Coordenadas de Pueblos Origen',
        'Last updated at:': 'Ultima Actualizaci처n',
        'Mass Tag Incomings': 'Identificar en Masa',
        'Tagging incomings ...': 'Identificando Ataques ...',
        'Watchtower Timer': 'Tiempos de Torre de Vigilancia',
        'Watchtower Timer script initialized ...':
            'Script de Torre de Vigilancia iniciado ...',
        'Current world does not support watchtower!':
            'Mundo actual no tiene Torre de Vigilancia!',
        'Watchtower Timer script is already initialized!':
            'Script de Torre de Vigilancia fue iniciado!',
        'Create New Forum Thread': 'Crear Nuevo Tema en el foro',
        'Create New Mail': 'Crear Nuevo Memo',
        Overview: 'Vista General',
        Map: 'Mapa',
        Fetch: 'Buscar por',
        'Village data could not be fetched!':
            'Datos del pueblo no fueron encontrados',
        Support: 'Apoyo',
        'OP Spotter': 'OP Spotter',
        'Landing Time': 'Hora de llegada',
        'Own Villages Info': 'Own Villages Info',
        'Own Villages': 'Own Villages',
        'Enemy Villages': 'Enemy Villages',
        'Redirecting to Incomings page...': 'Redirecting to Incomings page...',
        'There was an error parsing the incomings list!':
            'There was an error parsing the incomings list!',
        'Fake Finder': 'Fake Finder',
        'Find Fakes': 'Find Fakes',
        'Fakes where found!': 'Fakes where found!',
        'No fakes where found!': 'No fakes where found!',
        'Add Backtime': 'Add Backtime',
        'Backtime was added on incoming label!':
            'Backtime was added on incoming label!',
        'All incomings have backtime already added!':
            'All incomings have backtime already added!',
        'Tag incomings before adding backtimes!':
            'Tag incomings before adding backtimes!',
        'tomorrow at': 'tomorrow at',
        'Mark Duplicates': 'Mark Duplicates',
        'No duplicate incomings found!': 'No duplicate incomings found!',
        'Renaming ...': 'Renaming ...',
    },
    it_IT: {
        'Incomings Overview': 'Panoramica degli incassi',
        Help: 'Aiuto',
        'It seems like you have no incomings ':
            'Sembra che tu non abbia entrate ',
        'Total Incomings:': 'Incassi totali:',
        'Attacking Players:': 'Attaccare i giocatori:',
        'Total Attacking Players:': 'Totale giocatori attaccanti:',
        'Destination Villages Count:': 'Conteggio villaggi di destinazione:',
        'Origin Villages Count:': 'Conteggio villaggi di origine:',
        'Destination Villages': 'Villaggi di destinazione',
        'Origin Villages': `Villaggi d'origine`,
        'Export Incomings Data': 'Esporta dati in entrata',
        'Highlight Possible Nobles': 'Evidenzia possibili nobili',
        Village: 'Villaggio',
        Count: 'Contano',
        'Toggle Combinations': 'Toggle Combinations',
        'Possible nobles are highlighted!': 'Combinazioni di commutazione',
        'No possible nobles were found!':
            'I possibili nobili sono evidenziati!',
        Watchtower: 'Torre di avvistamento',
        'Attack:': 'Attacco:',
        'Small Attack:': 'Piccolo attacco:',
        'Medium Attack:': 'Attacco medio:',
        'Large Attack:': 'Grande attacco:',
        'Contains Nobleman:': 'Contiene Nobile:',
        'Destination Villages List': 'Elenco dei villaggi di destinazione',
        'Destination Villages Coords': 'Coordi dei villaggi di destinazione',
        'Origin Villages List': 'Elenco dei villaggi di origine',
        'Origin Villages Coords': 'Origin Villages Coords',
        'Last updated at:': 'Ultimo aggiornamento alle:',
        'Mass Tag Incomings': 'Ingressi tag di massa',
        'Tagging incomings ...': 'Tagging in entrata...',
        'Watchtower Timer': 'Cronometro della Torre di Guardia',
        'Watchtower Timer script initialized ...':
            'Script Watchtower Timer inizializzato...',
        'Current world does not support watchtower!':
            'Il mondo attuale non supporta la torre di guardia!',
        'Watchtower Timer script is already initialized!':
            'Lo script Watchtower Timer 챔 gi횪 inizializzato!',
        'Create New Forum Thread': 'Crea una nuova discussione nel forum',
        'Create New Mail': 'Crea nuova mail',
        Overview: 'Panoramica',
        Map: 'Carta geografica',
        Fetch: 'Andare a prendere',
        'Village data could not be fetched!':
            'Impossibile recuperare i dati del villaggio!',
        'OP Spotter': 'Osservatore OP',
        'Landing Time': 'Tempo di atterraggio',
        'Own Villages Info': 'Informazioni sui propri villaggi',
        'Own Villages': 'Villaggi propri',
        'Enemy Villages': 'Villaggi nemici',
        'Redirecting to Incomings page...':
            'Reindirizamento alla pagina Incoming...',
        'There was an error parsing the incomings list!': `Si 챔 verificato un errore durante l'analisi dell'elenco dei messaggi in entrata!`,
        'Fake Finder': 'Ricerca falsi',
        'Find Fakes': 'Trova falsi',
        'Fakes where found!': 'Finsi dove trovati!',
        'No fakes where found!': 'Nessun falso dove trovato!',
        'Add Backtime': 'Aggiungi indietro',
        'Backtime was added on incoming label!': `Backtime 챔 stato aggiunto all'etichetta in arrivo!`,
        'All incomings have backtime already added!':
            'Tutti gli ingressi hanno gi횪 il backtime aggiunto!',
        'Tag incomings before adding backtimes!':
            'Tagga gli ingressi prima di aggiungere i tempi arretrati!',
        'tomorrow at': 'tomorrow at',
        'Mark Duplicates': 'Mark Duplicates',
        'No duplicate incomings found!': 'No duplicate incomings found!',
        'Renaming ...': 'Renaming ...',
    },
    tr_TR: {
        'Incomings Overview': 'Incomings Overview',
        Help: 'Destek',
        'It seems like you have no incomings ': 'Hi챌 gelen yok gibi g철r체n체yor ',
        'Total Incomings:': 'Toplam gelenler:',
        'Attacking Players:': 'Sald캇ran Oyuncular:',
        'Total Attacking Players:': 'Toplam Sald캇ran Oyuncular:',
        'Destination Villages Count:': 'Hedef K철y Say캇s캇:',
        'Origin Villages Count:': 'Kaynak K철y Say캇s캇:',
        'Destination Villages': 'Hedef K철yler',
        'Origin Villages': 'Kaynak K철yler',
        'Export Incomings Data': 'Gelen Verilerini D캇힊a Aktar',
        'Highlight Possible Nobles': 'Olas캇 Misyonerleri Vurgulay캇n',
        Village: 'K철y',
        Count: 'Say',
        'Toggle Combinations': 'Kombinasyonlar캇 De휓i힊tir',
        'Possible nobles are highlighted!': 'Olas캇 misyonerler vurgulan캇r!',
        'No possible nobles were found!': 'Olas캇 misyoner bulunamad캇!',
        Watchtower: 'G철zetleme Kulesi',
        'Attack:': 'Sald캇r캇    :',
        'Small Attack:': 'K체챌체k Sald캇r캇:',
        'Medium Attack:': 'Orta Sald캇r캇:',
        'Large Attack:': 'B체y체k Sald캇r캇:',
        'Contains Nobleman:': 'Misyoner 캅챌erir:',
        'Destination Villages List': 'Gidilecek K철yler Listesi',
        'Destination Villages Coords': 'Hedef K철yler Koordinatlar캇',
        'Origin Villages List': 'Kaynak K철y Listesi',
        'Origin Villages Coords': 'Kaynak K철y Koordinatlar캇',
        'Last updated at:': 'Son g체ncelleme:',
        'Mass Tag Incomings': 'Gelenleri Toplu Etiket',
        'Tagging incomings ...': 'Gelenler Etiketleniyor ...',
        'Watchtower Timer': 'G철zetleme Kulesi Zaman캇',
        'Watchtower Timer script initialized ...':
            'G철zetleme Kulesi zamanlay캇c캇 scripti ba힊lat캇ld캇 ...',
        'Current world does not support watchtower!':
            'Bu d체nya g철zetleme kulesini desteklemiyor!',
        'Watchtower Timer script is already initialized!':
            'G철zetleme kulesi zamanlay캇c캇 scripti zaten ba힊lat캇ld캇',
        'Create New Forum Thread': 'Yeni Forum Konusu Olu힊tur',
        'Create New Mail': 'Yeni Posta Olu힊tur',
        Overview: 'Genel bak캇힊',
        Map: 'Harita',
        Fetch: 'Getir',
        'Village data could not be fetched!': 'K철y verileri getirilemedi!',
        Support: 'Destek',
        'OP Spotter': 'OP Spotter',
        'Landing Time': 'Var캇힊 Zaman캇',
        'Own Villages Info': 'Kendi K철y Bilgileri',
        'Own Villages': 'Kendi K철yleri',
        'Enemy Villages': 'D체힊man K철yleri',
        'Redirecting to Incomings page...':
            'Gelenler sayfas캇na y철nlendiriliyor...',
        'There was an error parsing the incomings list!':
            'Gelenler listesi ayr캇힊t캇r캇l캇rken bir hata olu힊tu!',
        'Fake Finder': 'Fake Bulucu',
        'Find Fakes': 'Fake Bul',
        'Fakes where found!': 'Fakes bulundu!',
        'No fakes where found!': 'Fake bulundmad캇!',
        'Add Backtime': 'Geri d철n체힊 ekle',
        'Backtime was added on incoming label!':
            'Gelen etikete geri d철n체힊 s체resi eklendi!',
        'All incomings have backtime already added!':
            'T체m gelenlere zaten geri d철n체힊 s체resi eklenmi힊!',
        'Tag incomings before adding backtimes!':
            'Geri d철n체힊 eklemeden 철nce gelenleri etiketleyin!',
    },
};

// Init Debug
initDebug();

// Init Count API
countAPI();

/* Fetch unit info only when needed */
if (LAST_UPDATED_TIME !== null) {
    if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
        fetchUnitInfo();
    } else {
        unitInfo = JSON.parse(localStorage.getItem(`${LS_PREFIX}_unit_info`));
    }
} else {
    fetchUnitInfo();
}

// Initialize script logic
function initIncomingsOverview() {
    const incomings = jQuery('#incomings_table tbody tr.nowrap');
    const incomingsList = collectIncomingsData(incomings);
    const content = prepareContent(incomingsList);
    renderIncomingsOverviewUI(content);

    // scroll to incomings overview element
    jQuery('html,body').animate(
        { scrollTop: jQuery('#raIncomingsOverview').offset().top - 10 },
        'slow'
    );

    // action handlers
    toggleCombinations();
    highlightPossibleNobles();
    massTagIncomings();
    watchtowerTimer();
    ownVillagesInfo();
    handleAddBacktime();
    handleMarkDuplicates();
    opSpotter();
    fakeFinder();
}

// Helper: Collect incomings data
function collectIncomingsData(incomings) {
    let incomingsList = [];

    incomings.each((_, incoming) => {
        const isNoble =
            jQuery(incoming).find('td:eq(0)').find('img:eq(1)').attr('src') &&
            jQuery(incoming)
                .find('td:eq(0)')
                .find('img:eq(1)')
                .attr('src')
                .split('/')
                .pop()
                .split('#')[0]
                .split('?')[0];
        incomingsList.push({
            attackType: jQuery(incoming)
                .find('td:eq(0)')
                .find('img')
                .attr('src')
                .split('/')
                .pop()
                .split('#')[0]
                .split('?')[0],
            containsNoble: isNoble,
            destination: {
                coord: jQuery(incoming)
                    .find('td:eq(1)')
                    .text()
                    .match(coordsRegex)[0],
                name: jQuery(incoming).find('td:eq(1)').text().trim(),
                link: jQuery(incoming).find('td:eq(1) a').attr('href'),
            },
            origin: {
                coord: jQuery(incoming)
                    .find('td:eq(2)')
                    .text()
                    .match(coordsRegex)[0],
                name: jQuery(incoming).find('td:eq(2)').text().trim(),
                link: jQuery(incoming).find('td:eq(2) a').attr('href'),
            },
            attacker: {
                name: jQuery(incoming).find('td:eq(3)').text().trim(),
                link: jQuery(incoming).find('td:eq(3) a').attr('href'),
            },
            arrivesIn: jQuery(incoming).find('td:eq(6)').text(),
        });
    });

    return incomingsList;
}

// Prepare content for incomings overview
function prepareContent(incomingsList) {
    const attackTypes = incomingsList.map((incoming) => incoming.attackType);
    const destinationVillages = incomingsList.map(
        (incoming) => incoming.destination
    );
    const originVillages = incomingsList.map((incoming) => incoming.origin);
    const attackingPlayers = incomingsList.map((incoming) => incoming.attacker);
    const containsNoble = incomingsList.map(
        (incoming) => incoming.containsNoble
    );
    const arrivesIn = incomingsList.map((incoming) => incoming.arrivesIn);

    const destinationCoords = destinationVillages.map(
        (village) => village.coord
    );
    const originCoords = originVillages.map((village) => village.coord);
    const attackerNames = attackingPlayers.map((attacker) => attacker.name);

    const destinationVillagesFrequency = frequencyCounter(destinationCoords);
    const attackingVillagesFrequency = frequencyCounter(originCoords);
    const attackersFrequency = frequencyCounter(attackerNames);
    const attackTypesFrequency = frequencyCounter(attackTypes);
    const containsNobleFrequency = frequencyCounter(containsNoble);

    const totalDestinationVillages = Object.keys(destinationVillagesFrequency);
    const totalOriginVillages = Object.keys(attackingVillagesFrequency);
    const totalAttackingPlayers = [...new Set(attackerNames)];

    const untaggedAttacks = parseInt(attackTypesFrequency['attack.png']) || 0;
    const attackSmall = parseInt(attackTypesFrequency['attack_small.png']) || 0;
    const attackMedium =
        parseInt(attackTypesFrequency['attack_medium.png']) || 0;
    const attackLarge = parseInt(attackTypesFrequency['attack_large.png']) || 0;
    const attackNoble = parseInt(containsNobleFrequency['snob.png']) || 0;

    const destinationVillagesList = getVillagesListCounts(destinationVillages);
    const originVillagesList = getVillagesListCounts(originVillages);
    const attackingPlayersList = getAttackingPlayersList(attackingPlayers);

    const destinationVillagesCombination = getVillagesCombinations(
        destinationVillagesList,
        'own'
    );
    const originVillagesCombination = getVillagesCombinations(
        originVillagesList,
        'enemy'
    );

    const destinationVillagesCombinationBB = getVillagesCombinationsBBCode(
        destinationVillagesFrequency
    );
    const originVillagesCombinationBB = getVillagesCombinationsBBCode(
        attackingVillagesFrequency
    );

    const attackersList = getAttackersListHtml(attackingPlayersList);

    const buildingsList = game_data.village.buildings;

    const serverTime = jQuery('#serverTime').text();
    const serverDate = jQuery('#serverDate').text();
    const serverDateTime = serverTime + ' ' + serverDate;

    const bbPlayers = getBBCodePlayersList(attackersFrequency);

    const arrivalTimes = getArrivalTimes(arrivesIn);
    const arrivalTimesCounts = frequencyCounter(arrivalTimes);
    const opSpotterChart = buildOpSpotterChart(arrivalTimesCounts);
    const arrivalTimesCountsString = encodeURIComponent(
        JSON.stringify(arrivalTimesCounts)
    );

    const villageslistJSON = encodeURIComponent(
        JSON.stringify(destinationVillagesList)
    );

    let watchtowerInfoBBCode = ``;
    if ('watchtower' in buildingsList) {
        watchtowerInfoBBCode = `[b][size=12]${tt(
            'Watchtower'
        )}[/size][/b]\n[b]${tt('Attack:')}[/b] ${untaggedAttacks}\n[b]${tt(
            'Small Attack:'
        )}[/b] ${attackSmall}\n[b]${tt(
            'Medium Attack:'
        )}[/b] ${attackMedium}\n[b]${tt(
            'Large Attack:'
        )}[/b] ${attackLarge}\n[b]${tt(
            'Contains Nobleman:'
        )}[/b] ${attackNoble}\n
		`;
    }

    let bbCode = ``;
    bbCode += `[b][i][color=#ff2e2e]${tt(
        'Last updated at:'
    )}[/color] ${serverDateTime}[/i][/b]\n\n[b]${tt('Total Incomings:')}[/b] ${
        incomingsList.length
    }\n[b]${tt('Total Attacking Players:')}[/b] ${
        totalAttackingPlayers.length
    }\n[b]${tt('Attacking Players:')}[/b] ${bbPlayers}\n[b]${tt(
        'Destination Villages Count:'
    )}[/b] ${totalDestinationVillages.length}\n[b]${tt(
        'Origin Villages Count:'
    )}[/b] ${
        totalOriginVillages.length
    }\n\n${watchtowerInfoBBCode}\n[b][size=12]${tt('Destination Villages')} (${
        totalDestinationVillages.length
    })[/size][/b]\n\n[spoiler=${tt(
        'Destination Villages List'
    )}]\n${destinationVillagesCombinationBB}\n\n[/spoiler]\n[spoiler=${tt(
        'Destination Villages Coords'
    )}][code]${totalDestinationVillages.join(
        ' '
    )}[/code][/spoiler]\n[b][size=12]${tt('Origin Villages')} (${
        totalOriginVillages.length
    })[/size][/b]\n\n[spoiler=${tt(
        'Origin Villages List'
    )}]\n${originVillagesCombinationBB}\n\n[/spoiler]\n[spoiler=${tt(
        'Origin Villages Coords'
    )}][code]${totalOriginVillages.join(' ')}[/code][/spoiler]
		`;

    let watchtowerInfo = ``;
    if ('watchtower' in buildingsList) {
        watchtowerInfo = `
			<h4>${tt('Watchtower')}</h4>
            <b><img src="/graphic/command/attack.png"> ${tt(
            'Attack:'
        )}</b> ${untaggedAttacks}/${
            incomingsList.length
        } ${calculatePercentages(untaggedAttacks, incomingsList.length)}%<br>
            <b><img src="/graphic/command/attack_small.png"> ${tt(
            'Small Attack:'
        )}</b> ${attackSmall}/${
            incomingsList.length
        } ${calculatePercentages(attackSmall, incomingsList.length)}%<br>
            <b><img src="/graphic/command/attack_medium.png"> ${tt(
            'Medium Attack:'
        )}</b> ${attackMedium}/${
            incomingsList.length
        } ${calculatePercentages(attackMedium, incomingsList.length)}%<br>
            <b><img src="/graphic/command/attack_large.png"> ${tt(
            'Large Attack:'
        )}</b> ${attackLarge}/${
            incomingsList.length
        } ${calculatePercentages(attackLarge, incomingsList.length)}%<br>
			<b><img src="/graphic/command/snob.png"> ${tt(
            'Contains Nobleman:'
        )}</b> ${attackNoble}/${
            incomingsList.length
        } ${calculatePercentages(attackNoble, incomingsList.length)}%<br>
		`;
    }

    return `
        <div>
            <p>
                <b>${tt('Total Incomings:')}</b> ${incomingsList.length}<br>
                <b>${tt('Total Attacking Players:')}</b> ${
        totalAttackingPlayers.length
    }<br>
                <b>${tt('Attacking Players:')}</b> ${attackersList}<br>
                <b>${tt('Destination Villages Count:')}</b> ${
        totalDestinationVillages.length
    }<br>
                <b>${tt('Origin Villages Count:')}</b> ${
        totalOriginVillages.length
    }<br>
                ${watchtowerInfo}<br>
            </p>
        </div>
        <div class="ra-grid ra-grid-half ra-mb14">
            <div>
                <label for="destinationVillagesCoords">
                    ${tt('Destination Villages')} (${
        totalDestinationVillages.length
    })
                </label>
                <textarea id="destinationVillagesCoords">${totalDestinationVillages.join(
        ' '
    )}</textarea>
            </div>
            <div>
                <label for="originVillagesCoords">
                    ${tt('Origin Villages')} (${totalOriginVillages.length})
                </label>
				<textarea id="originVillagesCoords">${totalOriginVillages.join(' ')}</textarea>
            </div>
		</div>
		<div class="ra-mb14">
			<label for="exportIncomingsCode">${tt('Export Incomings Data')}</label>
			<textarea readonly id="exportIncomingsCode">${bbCode}</textarea>
			<a href="/game.php?screen=forum&screenmode=view_forum&mode=new_thread" class="btn" target="_blank" rel="noopener noreferrer">
				${tt('Create New Forum Thread')}
			</a>
			<a href="/game.php?screen=mail&mode=new" class="btn" target="_blank" rel="noopener noreferrer">
				${tt('Create New Mail')}
			</a>
		</div>
		<div class="ra-mb14">
            <a href="javascript:void(0);" id="toggleCombinations" class="btn togglable-btn">
                ${tt('Toggle Combinations')}
            </a>
			<a href="javascript:void(0);" id="ownVillagesInfo" data-villages-list="${villageslistJSON}" class="btn togglable-btn">
                ${tt('Own Villages Info')}
            </a>
            <a href="javascript:void(0);" id="findNobles" class="btn">
                ${tt('Highlight Possible Nobles')}
			</a>
			<a href="javascript:void(0);" id="massTagIncomings" class="btn">
                ${tt('Mass Tag Incomings')}
			</a>
			<a href="javascript:void(0);" id="addBacktime" class="btn">
                ${tt('Add Backtime')}
			</a>
			<a href="javascript:void(0);" id="watchtowerTimer" class="btn">
                ${tt('Watchtower Timer')}
            </a>
			<a href="javascript:void(0);" id="opSpotter" class="btn" data-opspotter-image="${opSpotterChart}" data-opspotter-json="${arrivalTimesCountsString}">
                ${tt('OP Spotter')}
            </a>
			<a href="javascript:void(0);" id="fakeFinderBtn" class="btn">
                ${tt('Fake Finder')}
            </a>
			<a href="javascript:void(0);" id="markDuplicatesBtn" class="btn">
				${tt('Mark Duplicates')}
			</a>
        </div>
        <div id="incomingCombinations" class="togglable-content" style="display:none;">
			<div class="ra-grid ra-grid-half">
				<div>
					${destinationVillagesCombination}
				</div>
				<div>
					${originVillagesCombination}
				</div>
			</div>
		</div>
		<div id="ownVillagesInfoBox" class="togglable-content" style="display:none;"></div>
    `;
}

// Render UI
function renderIncomingsOverviewUI(body) {
    const content = `
        <div class="ra-incomings-overview vis" id="raIncomingsOverview">
            <h3>${tt(scriptData.name)}</h3>
            <div class="ra-incomings-overview-stats">
                ${body}
            </div>
            <br>
            <small>
                <strong>
                    ${tt(scriptData.name)} ${scriptData.version}
                </strong> -
                <a href="${
        scriptData.authorUrl
    }" target="_blank" rel="noreferrer noopener">
                    ${scriptData.author}
                </a> -
                <a href="${
        scriptData.helpLink
    }" target="_blank" rel="noreferrer noopener">
                    ${tt('Help')}
                </a>
            </small>
        </div>
        <style>
            .ra-incomings-overview { position: relative; display: block; width: auto; height: auto; clear: both; margin: 0 auto 15px; padding: 10px; border: 1px solid #603000; box-sizing: border-box; background: #f4e4bc; }
            .ra-incomings-overview * { box-sizing: border-box; }
			.ra-incomings-overview .btn { margin-bottom: 5px; }
            .ra-incomings-overview .btn-confirm-yes { padding: 3px; }
            .ra-incomings-overview-stats h4 { font-style: normal; }
            .ra-incomings-overview-stats p { line-height: 1.4; }
            .ra-incomings-overview-stats label { display: block; font-weight: 600; margin-bottom: 6px; }
            .ra-incomings-overview-stats textarea { width: 100%; height: 100px; resize: none; font-size: 13px; }
            .ra-grid { display: grid; grid-gap: 0 15px; }
            .ra-grid-half { grid-template-columns: 1fr 1fr; }
            .ra-mb14 { margin-bottom: 14px; }
            .ra-table { border-spacing: 2px; border-collapse: separate; margin-bottom: 5px; border: 2px solid #f0e2be; text-align: center; }
			.ra-table th { text-align: center; }
            .ra-table td { padding: 1px 2px; }
			.ra-table td:nth-of-type(1) { text-align: left; }
            .ra-table td a { word-break: break-all; }
			.ra-table a:focus { color: blue; }
			.ra-table a.btn:focus { color: #fff; }
			.ra-table tr:nth-of-type(2n) td { background-color: #f0e2be }
			.ra-table tr:nth-of-type(2n+1) td { background-color: #fff5da; }
            .ra-possible-noble td { background-color: #ffe875 !important; }
			.ra-text-center { text-align: center; }
			#exportIncomingsCode { height: 120px; }
			.ra-popup-content { width: 320px; }
			.ra-popup-content * { box-sizing: border-box; }
			.ra-popup-content label { display: block; font-weight: 600; margin-bottom: 8px; }
			.ra-popup-content textarea { width: 100%; height: 70px; resize: none; }
        </style>
    `;

    if (jQuery('.ra-incomings-overview').length < 1) {
        jQuery('#incomings_form').prepend(content);
    } else {
        jQuery('.ra-incomings-overview-stats').html(body);
    }
}

// Action Handler: Show Own Village Info
function ownVillagesInfo() {
    jQuery('#ownVillagesInfo').on('click', function (e) {
        e.preventDefault();
        const villagesList = jQuery(this).attr('data-villages-list');
        if (villagesList) {
            try {
                const parsedVillagesList = JSON.parse(
                    decodeURIComponent(villagesList)
                );
                const ownVillagesInfo =
                    buildOwnVillagesTable(parsedVillagesList);

                jQuery('.togglable-btn').removeClass('btn-confirm-yes');
                jQuery(this).addClass('btn-confirm-yes');

                jQuery('.togglable-content').fadeOut(300);
                jQuery('#ownVillagesInfoBox').fadeIn(300);
                jQuery('#ownVillagesInfoBox').html(ownVillagesInfo);

                fetchVillageInfo();
            } catch (error) {
                UI.ErrorMessage(
                    tt('There was an error parsing the incomings list!')
                );
                console.error(`${scriptInfo()} Error:`, error);
            }
        }
    });
}

// Action Handler: Toggle village and incoming/attacks sent combinations
function toggleCombinations() {
    jQuery('#toggleCombinations').on('click', function (e) {
        e.preventDefault();
        jQuery('.togglable-btn').removeClass('btn-confirm-yes');
        jQuery(this).addClass('btn-confirm-yes');
        jQuery('.togglable-content').fadeOut(300);
        jQuery('#incomingCombinations').fadeIn(300);
    });
}

// Action Handler: Highlight possible nobles
function highlightPossibleNobles() {
    jQuery('#findNobles').on('click', function (e) {
        e.preventDefault();

        const incomings = [];
        let highlightedCounter = 0;

        jQuery('#incomings_table tr.nowrap').each((_, incoming) => {
            incomings.push({
                el: incoming,
                ms: $(incoming)
                    .find('td:nth-of-type(6)')
                    .text()
                    .trim()
                    .match(/\d+:\d+:\d+:\d+/)[0]
                    .split(':')[3],
            });
        });

        incomings.forEach((inc, i) => {
            if (
                (i != 0 &&
                    Math.abs(inc.ms - incomings[i - 1].ms) == NOBLE_GAP) ||
                (i != incomings.length - 1 &&
                    Math.abs(inc.ms - incomings[i + 1].ms) == NOBLE_GAP)
            ) {
                jQuery(inc.el).addClass('ra-possible-noble');
                highlightedCounter++;
            }
        });

        if (highlightedCounter !== 0) {
            jQuery(this).addClass('btn-confirm-yes');
            UI.SuccessMessage(tt('Possible nobles are highlighted!'), 2000);
        } else {
            UI.ErrorMessage(tt('No possible nobles were found!'));
        }
    });
}

// Action Handler: Mass label incomings
function massTagIncomings() {
    jQuery('#massTagIncomings').on('click', function (e) {
        e.preventDefault();
        UI.SuccessMessage(tt('Tagging incomings ...'));
        jQuery('#select_all').click();
        setTimeout(function () {
            jQuery('input[name="label_format"]')
                .val(FORMAT)
                .parents('form')
                .find('input[name=label]')
                .click();
        }, 500);
    });

    if (jQuery('#massTagIncomings').length) {
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopImmediatePropagation();

                jQuery('#massTagIncomings').trigger('click');
            }
        });
    }
}

// Action Handler: Init Watchtower Timer script
function watchtowerTimer() {
    jQuery('#watchtowerTimer').on('click', function (e) {
        e.preventDefault();
        if ('watchtower' in game_data.village.buildings) {
            if (jQuery('#incomings_table tr:eq(0) th').length === 7) {
                jQuery(this).addClass('btn-confirm-yes');
                UI.SuccessMessage(
                    tt('Watchtower Timer script initialized ...')
                );
                $.getScript(
                    'https://dl.dropboxusercontent.com/s/dukcaol8u27wxg2/watchtower_timer.js'
                );
                console.debug(
                    'Watchtower Timer Script Link: https://forum.tribalwars.net/index.php?threads/watchtower-timer.285084/'
                );
            } else {
                UI.ErrorMessage(
                    tt('Watchtower Timer script is already initialized!')
                );
            }
        } else {
            UI.ErrorMessage(tt('Current world does not support watchtower!'));
        }
    });
}

// Action Handler: Fetch info for village
function fetchVillageInfo() {
    jQuery('.ra-fetch-info-btn').on('click', function (e) {
        e.preventDefault();

        const villageId = jQuery(this).attr('data-village-id');

        jQuery(this).addClass('btn-disabled');

        jQuery
            .get(
                game_data.link_base_pure +
                `map&ajax=map_info&source=${villageId}&target=${villageId}&`
            )
            .then((response) => {
                const { units, buildings, mood, flag } = response;
                const { wall, farm } = buildings;

                // collect total troops on village
                const unitsCounts = [];
                for (const [key, value] of Object.entries(units)) {
                    unitsCounts.push({
                        unit: key,
                        count:
                            parseInt(value.count.home) +
                            parseInt(value.count.foreign),
                    });
                }

                const wallLevel = highlightLevel(wall, 'wall');
                const moodLevel = highlightLevel(mood, 'loyalty');
                const farmLevel = highlightLevel(farm, 'farm');

                // set village flag
                jQuery(`tr.village-id-${villageId} td.village-flag`).text(
                    flag?.short_desc || 'N/A'
                );

                // set wall level
                jQuery(`tr.village-id-${villageId} td.building-loyalty`).html(
                    moodLevel
                );
                jQuery(`tr.village-id-${villageId} td.building-wall`).html(
                    wallLevel
                );
                jQuery(`tr.village-id-${villageId} td.building-farm`).html(
                    farmLevel
                );

                // set troop counts
                unitsCounts.forEach((item) => {
                    const { unit, count } = item;
                    jQuery(`tr.village-id-${villageId} td.unit-${unit}`).text(
                        formatAsNumber(count)
                    );
                });
            })
            .catch((error) => {
                UI.ErrorMessage(tt('Village data could not be fetched!'));
                console.error(`${scriptInfo()} Error:`, error);
            });
    });
}

// Action Handler: Add backtime on incoming label
function handleAddBacktime() {
    jQuery('#addBacktime').on('click', function (e) {
        e.preventDefault();

        let tableLength = document.querySelector('#incomings_table > tbody')
            .rows.length;
        let updatesCounter = 0;
        let incomingsWithBacktime = jQuery(
            '#incomings_form tr .quickedit-label:contains("B:")'
        );
        let totalIncomings = jQuery('#incomings_form tr .quickedit-label');
        let missingBackTimes = 0;

        if (DEBUG) {
            console.debug(
                `${scriptInfo()} incomingsWithBacktime`,
                incomingsWithBacktime
            );
            console.debug(`${scriptInfo()} totalIncomings`, totalIncomings);
        }

        if (incomingsWithBacktime.length === totalIncomings.length) {
            UI.SuccessMessage(tt('All incomings have backtime already added!'));
        } else {
            for (let i = 2; i < tableLength; i++) {
                let attackName = document
                    .querySelector(
                        '#incomings_table > tbody > tr:nth-child(' +
                        i +
                        ') > td:nth-child(1) > span > span > a:nth-child(1) > span.quickedit-label'
                    )
                    .innerHTML.replace(/(\r\n|\n|\r)/gm, '')
                    .replace(/ /g, '')
                    .toLowerCase();
                let commandName = jQuery(
                    '#incomings_table > tbody > tr:nth-child(' +
                    i +
                    ') > td:nth-child(1)'
                )
                    .text()
                    .trim();

                let destination = jQuery(
                    '#incomings_table > tbody > tr:nth-child(' +
                    i +
                    ') > td:nth-child(2) > a'
                )
                    .text()
                    .slice(0, -5)
                    .slice(-7);
                let origin = jQuery(
                    '#incomings_table > tbody > tr:nth-child(' +
                    i +
                    ') > td:nth-child(3) > a'
                )
                    .text()
                    .slice(0, -5)
                    .slice(-7);
                let incTime = jQuery(
                    '#incomings_table > tbody > tr:nth-child(' +
                    i +
                    ') > td:nth-child(6)'
                ).text();

                let x1 = destination.substr(0, 3);
                let y1 = destination.slice(-3);
                let x2 = origin.substr(0, 3);
                let y2 = origin.slice(-3);

                let x = Math.abs(x1 - x2);
                let y = Math.abs(y1 - y2);
                x = x * x;
                y = y * y;
                let distance = Math.sqrt(x + y);

                let unitSpeed;
                if (
                    attackName.includes(units.axe) ||
                    attackName.includes(units.spear) ||
                    attackName.includes(units.archer)
                ) {
                    unitSpeed = unitInfo.config['axe'].speed;
                } else if (attackName.includes(units.sword)) {
                    unitSpeed = unitInfo.config['sword'].speed;
                } else if (attackName.includes(units.spy)) {
                    unitSpeed = unitInfo.config['spy'].speed;
                } else if (
                    attackName.includes(units.light) ||
                    attackName.includes(units.marcher)
                ) {
                    unitSpeed = unitInfo.config['light'].speed;
                } else if (attackName.includes(units.heavy)) {
                    unitSpeed = unitInfo.config['heavy'].speed;
                } else if (
                    attackName.includes(units.ram) ||
                    attackName.includes(units.cat)
                ) {
                    unitSpeed = unitInfo.config['ram'].speed;
                } else if (attackName.includes(units.snob)) {
                    unitSpeed = unitInfo.config['snob'].speed;
                }

                let time = unitSpeed * distance;
                time = convertToTime(time);
                let subIncTime = incTime.match(/(\d{2}:){2}\d\d/g)[0];
                let backtime = calculateTimeDifference(
                    subIncTime,
                    time,
                    incTime
                );

                let formattedBacktimeTime = formatBackTimeTime(backtime);

                /* Only rename incoming if backtime has not been added yet and incoming has been tagged */
                if (unitSpeed) {
                    if (!commandName.includes('B:')) {
                        setTimeout(() => {
                            let newCommandName = `${commandName} B:${formattedBacktimeTime}`;
                            jQuery(
                                '#incomings_table > tbody > tr:nth-child(' +
                                i +
                                ') .rename-icon'
                            ).click();
                            jQuery(
                                '#incomings_table > tbody > tr:nth-child(' +
                                i +
                                ') .quickedit-edit input[type="text"]'
                            ).val(newCommandName);
                            jQuery(
                                '#incomings_table > tbody > tr:nth-child(' +
                                i +
                                ') .quickedit-edit input[type=button]'
                            ).click();
                            updatesCounter++;
                        }, i * 160);
                    }
                } else {
                    missingBackTimes++;
                }
            }

            if (updatesCounter > 0) {
                UI.SuccessMessage(tt('Backtime was added on incoming label!'));
            }

            if (missingBackTimes > 0) {
                UI.ErrorMessage(tt('Tag incomings before adding backtimes!'));
            }
        }
    });
}

// Action Handler: Mark attacks from same village as duplicates
async function handleMarkDuplicates() {
    jQuery('#markDuplicatesBtn').on('click', function (e) {
        e.preventDefault();

        let duplicateAttacks = [];

        jQuery('#incomings_table a[href*="screen=info_village"]').each(
            function () {
                let coordinates = jQuery(this)
                    .text()
                    .match(/\d+\|\d+/)
                    .toString();
                let duplicateCount = jQuery(
                    '#incomings_table a[href*="screen=info_village"]:contains("' +
                    coordinates +
                    '")'
                ).length;

                if (duplicateCount > 1) {
                    jQuery(this).css({
                        'background-color': 'red',
                        color: 'white',
                    });

                    let id = jQuery(this)
                        .closest('tr')
                        .find('td:first span.quickedit:first')
                        .attr('data-id');
                    let commandMessage = jQuery(
                        'span.quickedit[data-id="' + id + '"]'
                    )
                        .find('span.quickedit-label')
                        .text()
                        .trim();
                    let arrivesIn = jQuery(this)
                        .parent()
                        .parent()
                        .find('td:eq(6)')
                        .text();
                    let destinationCoordinate = jQuery(this)
                        .parent()
                        .parent()
                        .find('td:eq(1)')
                        .text()
                        .match(coordsRegex)[0];
                    let originCoordinate = jQuery(this)
                        .text()
                        .match(coordsRegex)[0];
                    let distance = calculateDistance(
                        destinationCoordinate,
                        originCoordinate
                    );

                    let attackName = commandMessage.toLowerCase();

                    let unitSpeed;
                    if (
                        attackName.includes(units.axe) ||
                        attackName.includes(units.spear) ||
                        attackName.includes(units.archer)
                    ) {
                        unitSpeed = unitInfo.config['axe'].speed;
                    } else if (attackName.includes(units.sword)) {
                        unitSpeed = unitInfo.config['sword'].speed;
                    } else if (attackName.includes(units.spy)) {
                        unitSpeed = unitInfo.config['spy'].speed;
                    } else if (
                        attackName.includes(units.light) ||
                        attackName.includes(units.marcher)
                    ) {
                        unitSpeed = unitInfo.config['light'].speed;
                    } else if (attackName.includes(units.heavy)) {
                        unitSpeed = unitInfo.config['heavy'].speed;
                    } else if (
                        attackName.includes(units.ram) ||
                        attackName.includes(units.cat)
                    ) {
                        unitSpeed = unitInfo.config['ram'].speed;
                    } else if (attackName.includes(units.snob)) {
                        unitSpeed = unitInfo.config['snob'].speed;
                    }

                    let arrivalTime =
                        parseInt(Timing.getCurrentServerTime() / 1000) +
                        parseTime(arrivesIn);

                    let sentTime =
                        arrivalTime - ((distance * unitSpeed * 60) | 0);

                    duplicateAttacks.push({
                        commandMessage,
                        id,
                        originCoordinate,
                        sentTime,
                    });
                } else {
                    jQuery(this).css({
                        'background-color': '',
                        color: '',
                    });
                }
            }
        );

        duplicateAttacks = duplicateAttacks.sort(function (a, b) {
            return a.sentTime - b.sentTime;
        });

        if (duplicateAttacks.length) {
            const groupByKey = (list, key) =>
                list.reduce(
                    (hash, obj) => ({
                        ...hash,
                        [obj[key]]: (hash[obj[key]] || []).concat(obj),
                    }),
                    {}
                );

            const duplicateAttacksGrouppedByOrigin = groupByKey(
                duplicateAttacks,
                'originCoordinate'
            );

            const finalArray = [];
            for (let [_, value] of Object.entries(
                duplicateAttacksGrouppedByOrigin
            )) {
                value.forEach((item, index) => {
                    const { id, commandMessage } = item;

                    let currentName = jQuery(
                        'span.quickedit[data-id="' + id + '"]'
                    )
                        .text()
                        .trim();

                    let nameOfIncomingCommand = commandMessage;

                    if (currentName.includes('AS:')) {
                        nameOfIncomingCommand = currentName
                            .split('AS:')[0]
                            .trim();
                    }
                    const newCommandName = `${nameOfIncomingCommand} AS:${
                        index + 1
                    }/${value.length}`;

                    finalArray.push({
                        id: id,
                        incomingName: newCommandName,
                    });
                });
            }

            // rename the incoming command
            finalArray.forEach((item, index) => {
                setTimeout(function () {
                    index++;
                    const { id, incomingName } = item;
                    jQuery('span.quickedit[data-id="' + id + '"]')
                        .find('.rename-icon')
                        .click();
                    jQuery('span.quickedit[data-id="' + id + '"]')
                        .find('input[type=text]')
                        .val(incomingName);
                    jQuery('span.quickedit[data-id="' + id + '"]')
                        .find('input[type=button]')
                        .click();
                    UI.InfoMessage(
                        `${index}/${finalArray.length} ${tt('Renaming ...')}`
                    );
                }, 160 * index);
            });
        } else {
            UI.InfoMessage(tt('No duplicate incomings found!'));
        }
    });
}

// Action Handler: Op Spotter
function opSpotter() {
    jQuery('#opSpotter').on('click', function (e) {
        e.preventDefault();

        jQuery(this).addClass('btn-confirm-yes');

        let opSpotterImage = jQuery(this).attr('data-opspotter-image');
        let opSpotterJSON = decodeURIComponent(
            jQuery(this).attr('data-opspotter-json')
        );
        opSpotterJSON = JSON.parse(opSpotterJSON);

        var sortOpSpotter = [];
        for (var item in opSpotterJSON) {
            sortOpSpotter.push([item, opSpotterJSON[item]]);
        }

        sortOpSpotter.sort(function (a, b) {
            return b[1] - a[1];
        });

        let opSpotterTable = `
			<table class="ra-table vis" width="100%">
				<thead>
					<tr>
						<th>${tt('Landing Time')}</th>
						<th>${tt('Count')}</th>
					</tr>
				</thead>
				<tbody>
		`;

        for (let [_, value] of Object.entries(sortOpSpotter)) {
            const landingTime = value[0];
            const count = value[1];

            opSpotterTable += `
				<tr>
					<td class="ra-text-center">
						${landingTime.substring(1, landingTime.length - 1)}
					</td>
					<td class="ra-text-center">
						${count}
					</td>
				</tr>
			`;
        }

        opSpotterTable += `
				</tbody>
			</table>
		`;

        const content = `
			<img src="${opSpotterImage}" width="99%">
			<div style="width:768px;max-width:100%;">
				${opSpotterTable}
			</div>
		`;

        Dialog.show('content', content);
    });
}

// Action Handler: Find fakes based on origin villages
function fakeFinder() {
    jQuery('#fakeFinderBtn').on('click', function (e) {
        e.preventDefault();
        jQuery(this).addClass('btn-confirm-yes');

        // uncheck incomings
        jQuery('#incomings_form input:checkbox').prop('checked', false);

        const popupContent = `
			<div class="ra-popup-content">
				<div class="ra-mb14">
					<label for="raOriginVillages">${tt('Origin Villages')}</label>
					<textarea id="raOriginVillages"></textarea>
				</div>
				<a href="javascript:void(0);" class="btn btn-confirm-yes" id="raFindIncomings">
					${tt('Find Fakes')}
				</a>
			</div>
		`;
        Dialog.show('Content', popupContent);

        filterIncomingsByOrigin();
    });
}

// Helper: Parse string as time
function parseTime(timeString) {
    let arr = timeString.split(':');
    for (var i = 0; i < arr.length; i++) arr[i] = arr[i] | 0;
    return arr[2] + arr[1] * 60 + arr[0] * 3600;
}

// Helper: Get incomings list with arrival times
function getIncomingsWithArrivalTimes(incomingsList) {
    const currentServerTime = getServerTime();

    return incomingsList.map((incoming) => {
        const [hours, minutes, seconds] = incoming.arrivesIn.split(':');
        const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;
        const arrivalDateTime = new Date(
            currentServerTime.getTime() + totalSeconds * 1000
        );

        let arrivalYear = arrivalDateTime.getFullYear();
        let arrivalMonth = arrivalDateTime.getMonth();
        let arrivalDate = arrivalDateTime.getDate();
        let arrivalHour = '' + arrivalDateTime.getHours();
        let arrivalMinute = '' + arrivalDateTime.getMinutes();
        let arrivalSecond = '' + arrivalDateTime.getSeconds();

        arrivalMonth = arrivalMonth + 1;
        arrivalMonth = '' + arrivalMonth;
        arrivalMonth = arrivalMonth.padStart(2, '0');

        arrivalHour = arrivalHour.padStart(2, '0');
        arrivalMinute = arrivalMinute.padStart(2, '0');
        arrivalSecond = arrivalSecond.padStart(2, '0');

        const fullArrivalTime = `${arrivalMonth}/${arrivalDate}/${arrivalYear} ${arrivalHour}:${arrivalMinute}:${arrivalSecond}`;

        return {
            ...incoming,
            arrivalTime: fullArrivalTime,
        };
    });
}

// Helper: Check incomings that have origin in coordinates input
function filterIncomingsByOrigin() {
    jQuery('#raFindIncomings').on('click', function (e) {
        e.preventDefault();

        const rows = jQuery('#incomings_form tr:not(:first):not(:last)');
        const origins = jQuery('#raOriginVillages')[0].value.match(/\d+\|\d+/g);
        let incsWhereChecked = 0;

        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < origins.length; j++) {
                if (rows[i].children[2].innerText.includes(origins[j])) {
                    const attackType = jQuery(rows[i])
                        .find('td:eq(0)')
                        .find('img')
                        .attr('src')
                        .split('/')
                        .pop()
                        .split('#')[0]
                        .split('?')[0];

                    const isNoble =
                        jQuery(rows[i])
                            .find('td:eq(0)')
                            .find('img:eq(1)')
                            .attr('src') &&
                        jQuery(rows[i])
                            .find('td:eq(0)')
                            .find('img:eq(1)')
                            .attr('src')
                            .split('/')
                            .pop()
                            .split('#')[0]
                            .split('?')[0];

                    if (
                        attackType !== 'attack_large.png' &&
                        attackType !== 'attack_medium' &&
                        isNoble !== 'snob.png'
                    ) {
                        jQuery(rows[i])
                            .find('[type="checkbox"]')
                            .prop('checked', true);
                        incsWhereChecked++;
                    }
                }
            }
        }

        if (incsWhereChecked) {
            UI.SuccessMessage(tt('Fakes where found!'));
        } else {
            UI.ErrorMessage(tt('No fakes where found!'));
        }

        Dialog.close();
    });
}

// Helper: Calculate Percentages
function calculatePercentages(amount, total) {
    return parseFloat((amount / total) * 100).toFixed(2);
}

// Helper: Build the table for the OP Spotter
function buildOpSpotterChart(arrivalTimesCounts) {
    const arrivalTimesKeys = Object.keys(arrivalTimesCounts);
    const arrivalTimesValues = Object.values(arrivalTimesCounts);
    const chartOptions = encodeURIComponent(
        `{"type":"bar","data":{"labels":[${arrivalTimesKeys}],"datasets":[{"label":"${tt(
            'OP Spotter'
        )}","data":[${arrivalTimesValues}]}]}}`
    );
    // Charts generated using QuickChart (https://quickchart.io/)
    // There is a built-in rate limit of 60 charts/min (1 chart/sec) per IP for free users.
    // https://quickchart.io/documentation/#faq
    return `https://quickchart.io/chart?bkg=white&c=${chartOptions}`;
}

// Helper: Get arrival times
function getArrivalTimes(arrivals) {
    const arrivalTimes = [];
    const currentServerTime = getServerTime();

    arrivals.forEach((arrival) => {
        const [hours, minutes, seconds] = arrival.split(':');
        const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;
        const arrivalDateTime = new Date(
            currentServerTime.getTime() + totalSeconds * 1000
        );

        let arrivalMonth = arrivalDateTime.getMonth();
        let arrivalDate = arrivalDateTime.getDate();
        let arrivalHour = '' + arrivalDateTime.getHours();

        arrivalMonth = arrivalMonth + 1;
        arrivalMonth = '' + arrivalMonth;
        arrivalMonth = arrivalMonth.padStart(2, '0');

        arrivalHour = arrivalHour.padStart(2, '0');

        arrivalTimes.push(`"${arrivalMonth}/${arrivalDate} ${arrivalHour}H"`);
    });
    arrivalTimes.sort((a, b) => a - b);
    return arrivalTimes;
}

// Helper: Calculate distance between 2 villages
function calculateDistance(villageA, villageB) {
    const x1 = villageA.split('|')[0];
    const y1 = villageA.split('|')[1];

    const x2 = villageB.split('|')[0];
    const y2 = villageB.split('|')[1];

    const deltaX = Math.abs(x1 - x2);
    const deltaY = Math.abs(y1 - y2);

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
}

// Helper: Highlight level differently
function highlightLevel(level, type) {
    let levelOutput = level;
    if (type === 'wall') {
        if (level != 20) {
            levelOutput = `<span><b>${level}</b></span>`;
        }
    }
    if (type === 'loyalty') {
        if (level <= 70) {
            levelOutput = `<span style="color:#ff6f00;"><b>${level}</b></span>`;
        }
        if (level <= 35) {
            levelOutput = `<span style="color:#ff0000;"><b>${level}</b></span>`;
        }
    }
    if (type === 'farm') {
        if (level < 30) {
            levelOutput = `<span style="color:#ff6f00;"><b>${level}</b></span>`;
        }
    }
    return levelOutput;
}

// Helper: Get server time
function getServerTime() {
    const serverTime = jQuery('#serverTime').text();
    const serverDate = jQuery('#serverDate').text();

    const [day, month, year] = serverDate.split('/');
    const serverTimeFormatted =
        year + '-' + month + '-' + day + ' ' + serverTime;
    const serverTimeObject = new Date(serverTimeFormatted);

    return serverTimeObject;
}

// Helper: Get attacking players list with links
function getAttackingPlayersList(attackingPlayersObject) {
    const uniqueAttackingPlayers = removeDuplicateObjectsFromArray(
        attackingPlayersObject,
        'name'
    );

    const attackingPlayersCount = attackingPlayersObject.reduce((obj, v) => {
        obj[v.name] = (obj[v.name] || 0) + 1;
        return obj;
    }, {});

    const mergedAttackingPlayerData = uniqueAttackingPlayers.map(
        (attackingPlayer) => {
            return (attackingPlayer = {
                ...attackingPlayer,
                attacksSent: attackingPlayersCount[attackingPlayer.name],
            });
        }
    );

    return mergedAttackingPlayerData;
}

// Helper: Get attacking players list with links
function getVillagesListCounts(villagesObj) {
    const uniqueVillages = removeDuplicateObjectsFromArray(
        villagesObj,
        'coord'
    );

    const villagesCount = villagesObj.reduce((obj, v) => {
        obj[v.coord] = (obj[v.coord] || 0) + 1;
        return obj;
    }, {});

    const mergedVillagesList = uniqueVillages.map((village) => {
        return (village = {
            ...village,
            count: villagesCount[village.coord],
        });
    });

    return mergedVillagesList;
}

// Helper: Remove duplicate objects from an array of objects
function removeDuplicateObjectsFromArray(array, prop) {
    return array.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

// Render HTML list for attacking players
function getAttackersListHtml(attackingPlayersList) {
    let attackersList = ``;
    attackingPlayersList.forEach((attackingPlayer) => {
        attackersList += `
			<a href="${attackingPlayer.link}" target="_blank" rel="noreferrer noopener">
				${attackingPlayer.name}
			</a> (${attackingPlayer.attacksSent}) , 
		`;
    });
    return attackersList;
}

// Helper: Prepare BB code players list and attacks sent from each player
function getBBCodePlayersList(attackersFrequency) {
    let bbPlayers = ``;
    for (let [key, value] of Object.entries(attackersFrequency)) {
        bbPlayers += `[player]${key}[/player] (${value}), `;
    }
    return bbPlayers;
}

// Helper: Build own villages table
function buildOwnVillagesTable(incomings) {
    const incomingsSorted = incomings.sort((a, b) => b.count - a.count);

    let thVillageUnits = ``;
    let tdVillageUnits = ``;
    game_data.units.forEach((unit) => {
        if (unit !== 'militia') {
            thVillageUnits += `<th><img src="/graphic/unit/unit_${unit}.png"></th>`;
            tdVillageUnits += `<td class="ra-text-center unit-${unit}"></td>`;
        }
    });

    let incomingsTable = `
        <table class="vis overview_table ra-table" width="100%">
        <thead>
            <tr>
                <th>${tt('Overview')}</th>
				<th>${tt('Village')}</th>
				<th>${tt('Support')}</th>
				<th>${tt('Fetch')}</th>
				<th><span class="icon header flags"></span></th>
				<th><img src="/graphic/buildings/snob.png"></th>
				<th><img src="/graphic/buildings/wall.png"></th>
				<th><img src="/graphic/buildings/farm.png"></th>
				${thVillageUnits}
            </tr>
        </thead>
    `;

    incomingsSorted.forEach((incoming) => {
        const { coord, name, link, count } = incoming;
        const [x, y] = coord.split('|');
        const villageId = getParameterByName(
            'village',
            window.location.origin + link
        );

        incomingsTable += `
            <tr class="village-id-${villageId}">
                <td>
                    <a href="${link}" target="_blank" rel="noopener noreferrer">
						${name}
					</a> (${count})
                </td>
				<td>
                    <a href="${
            game_data.link_base_pure
        }info_village&id=${villageId}" target="_blank" rel="noopener noreferrer">
						${coord}
					</a>
                </td>
				<td>
					<a href="${
            game_data.link_base_pure
        }place&mode=call&target=${villageId}&village=${villageId}" class="btn ra-ask-support-btn" target="_blank" rel="noopener noreferrer">
						${tt('Support')}
					</a>
				</td>
				<td>
					<a href="javascript:void(0);" class="ra-fetch-info-btn btn" data-village-id="${villageId}">
						${tt('Fetch')}
					</a>
				</td>
				<td class="village-flag"></td>
				<td class="building-loyalty"></td>
				<td class="building-wall"></td>
				<td class="building-farm"></td>
				${tdVillageUnits}
            </tr>
        `;
    });

    incomingsTable += `</table>`;

    return incomingsTable;
}

// Helper: Prepare village combinations
function getVillagesCombinations(incomings, type) {
    const incomingsSorted = incomings.sort((a, b) => b.count - a.count);

    let typeOfVillages = '';
    if (type === 'own') {
        typeOfVillages = tt('Own Villages');
    } else if (type === 'enemy') {
        typeOfVillages = tt('Enemy Villages');
    } else {
        typeOfVillages = '';
    }

    let incomingsTable = `
        <table class="vis overview_table ra-table" width="100%">
        <thead>
            <tr>
                <th>
                    ${typeOfVillages}
                </th>
				<th>
                    ${tt('Village')}
                </th>
				<th>
                    ${tt('Count')}
                </th>
            </tr>
        </thead>
    `;

    incomingsSorted.forEach((incoming) => {
        const { coord, name, link, count } = incoming;
        const [x, y] = coord.split('|');

        let villageId = 0;
        if (type === 'own') {
            villageId = getParameterByName(
                'village',
                window.location.origin + link
            );
        } else if (type === 'enemy') {
            villageId = getParameterByName('id', window.location.origin + link);
        }

        incomingsTable += `
            <tr class="village-id-${villageId}">
                <td>
                    <a href="${link}" target="_blank" rel="noopener noreferrer">
						${name}
					</a>
                </td>
				<td>
                    <a href="${game_data.link_base_pure}info_village&id=${villageId}" target="_blank" rel="noopener noreferrer">
						${coord}
					</a>
                </td>
				<td>
					${count}
				</td>
            </tr>
        `;
    });

    incomingsTable += `</table>`;

    return incomingsTable;
}

// Helper: Get villages combinations as BB Code
function getVillagesCombinationsBBCode(incomings) {
    const incomingsSorted = Object.entries(incomings).sort(
        (a, b) => b[1] - a[1]
    );

    let incomingsBBCode = ``;

    for (let [_, value] of Object.entries(incomingsSorted)) {
        incomingsBBCode += `[coord]${value[0]}[/coord] (${value[1]})\n`;
    }

    return incomingsBBCode;
}

// Helper: Count how many times an item appears on an array
function frequencyCounter(array) {
    return array.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
}

$.getAll = function (
    urls, // array of URLs
    onLoad, // called when any URL is loaded, params (index, data)
    onDone, // called when all URLs successfully loaded, no params
    onError // called when a URL load fails or if onLoad throws an exception, params (error)
) {
    var numDone = 0;
    var lastRequestTime = 0;
    var minWaitTime = 200; // ms between requests
    loadNext();
    function loadNext() {
        if (numDone == urls.length) {
            onDone();
            return;
        }

        let now = Date.now();
        let timeElapsed = now - lastRequestTime;
        if (timeElapsed < minWaitTime) {
            let timeRemaining = minWaitTime - timeElapsed;
            setTimeout(loadNext, timeRemaining);
            return;
        }
        lastRequestTime = now;
        $.get(urls[numDone])
            .done((data) => {
                try {
                    onLoad(numDone, data);
                    ++numDone;
                    loadNext();
                } catch (e) {
                    onError(e);
                }
            })
            .fail((xhr) => {
                onError(xhr);
            });
    }
};

// Helper: Get pages to fetch list
function getPagesToFetch() {
    let list_pages = [];

    if (
        document.getElementsByClassName('vis')[1].getElementsByTagName('select')
            .length > 0
    ) {
        Array.from(
            document
                .getElementsByClassName('vis')[1]
                .getElementsByTagName('select')[0]
        ).forEach(function (item) {
            list_pages.push(item.value);
        });
        list_pages.pop();
    } else if (document.getElementsByClassName('paged-nav-item').length > 0) {
        let nr = 0;
        Array.from(document.getElementsByClassName('paged-nav-item')).forEach(
            function (item) {
                let current = item.href;
                current = current.split('page=')[0] + 'page=' + nr;
                nr++;
                list_pages.push(current);
            }
        );
    } else {
        let current_link = window.location.href;
        list_pages.push(current_link);
    }
    list_pages.shift();

    return list_pages;
}

// Helper: Format as number
function formatAsNumber(number) {
    return parseInt(number).toLocaleString('de');
}

// Helper: Get parameter by name
function getParameterByName(name, url = window.location.href) {
    return new URL(url).searchParams.get(name);
}

// Helper: Count API
function countAPI() {
    const { author, prefix } = scriptData;
    jQuery.getJSON(
        `https://api.countapi.xyz/hit/${author}/${prefix}`,
        function ({ value }) {
            console.debug(
                `${scriptInfo()} This script has been run ${formatAsNumber(
                    parseInt(value)
                )} times.`
            );
        }
    );
}

/* Helper: Fetch World Unit Info */
function fetchUnitInfo() {
    jQuery
        .ajax({
            url: '/interface.php?func=get_unit_info',
        })
        .done(function (response) {
            unitInfo = xml2json($(response));
            localStorage.setItem(
                `${LS_PREFIX}_unit_info`,
                JSON.stringify(unitInfo)
            );
            localStorage.setItem(
                `${LS_PREFIX}_last_updated`,
                Date.parse(new Date())
            );
        });
}

/* Helper: XML to JSON converter */
var xml2json = function ($xml) {
    var data = {};
    $.each($xml.children(), function (i) {
        var $this = $(this);
        if ($this.children().length > 0) {
            data[$this.prop('tagName')] = xml2json($this);
        } else {
            data[$this.prop('tagName')] = $.trim($this.text());
        }
    });
    return data;
};

/* Convert minutes to HH:MM:SS */
function convertToTime(duration) {
    let seconds = (duration - parseInt(duration)) * 60;
    seconds = Math.round(seconds);
    duration = parseInt(duration);
    let minutes = duration % 60;
    duration = duration - minutes;
    let hours = duration / 60;
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);
    seconds = ('0' + seconds).slice(-2);
    return hours + ':' + minutes + ':' + seconds;
}

// Helper: Add two times
function calculateTimeDifference(time1, time2, incTime) {
    let time1Split = time1.split(':');
    let time2Split = time2.split(':');
    let s1 = parseInt(time1Split[2]);
    let m1 = parseInt(time1Split[1]);
    let h1 = parseInt(time1Split[0]);
    let s2 = parseInt(time2Split[2]);
    let m2 = parseInt(time2Split[1]);
    let h2 = parseInt(time2Split[0]);
    let s = s1 + s2;
    let m = m1 + m2;
    let h = h1 + h2;

    while (s >= 60) {
        s = s - 60;
        m = m + 1;
    }

    while (m >= 60) {
        m = m - 60;
        h = h + 1;
    }

    let days = 0;
    while (h >= 24) {
        h = h - 24;
        days++;
    }

    if (incTime.includes(tt('tomorrow at'))) {
        days = days + 1;
    }

    let hr = h;
    let min = m;
    let sec = s;
    let day;

    if (days === 0) {
        day = '0D ';
    } else if (days === 1) {
        day = '1D ';
    } else {
        day = days + 'D ';
    }

    hr = ('0' + hr).slice(-2);
    min = ('0' + min).slice(-2);
    sec = ('0' + sec).slice(-2);

    return day + hr + ':' + min + ':' + sec;
}

// Helper: Calculate backtime time
function formatBackTimeTime(backtime) {
    const [day, hoursAndMinutes] = backtime.split(' ');
    const [hours, minutes, seconds] = hoursAndMinutes.split(':');

    // server date time
    const serverTime = jQuery('#serverTime').text();
    const serverDate = jQuery('#serverDate').text();
    const [serverDay, serverMonth, serverYear] = serverDate.split('/');
    const serverTimeFormatted =
        serverYear + '-' + serverMonth + '-' + serverDay + ' ' + serverTime;
    const serverDateTimeUnix = new Date(serverTimeFormatted).getTime();

    let backtimeTime = new Date();

    if (parseInt(day) > 0) {
        backtimeTime = new Date(backtimeTime).setDate(
            new Date(serverDateTimeUnix).getDate() + parseInt(day)
        );
    }
    backtimeTime = new Date(backtimeTime).setHours(parseInt(hours));
    backtimeTime = new Date(backtimeTime).setMinutes(parseInt(minutes));
    backtimeTime = new Date(backtimeTime).setSeconds(parseInt(seconds));

    return formatDateTime(backtimeTime);
}

// Helper: Format date
function formatDateTime(date) {
    let currentDateTime = new Date(date);

    var currentYear = currentDateTime.getFullYear();
    var currentMonth = currentDateTime.getMonth();
    var currentDate = '' + currentDateTime.getDate();
    var currentHours = '' + currentDateTime.getHours();
    var currentMinutes = '' + currentDateTime.getMinutes();
    var currentSeconds = '' + currentDateTime.getSeconds();

    currentMonth = currentMonth + 1;
    currentMonth = '' + currentMonth;
    currentMonth = currentMonth.padStart(2, '0');

    currentDate = currentDate.padStart(2, 0);

    currentHours = currentHours.padStart(2, '0');
    currentMinutes = currentMinutes.padStart(2, '0');
    currentSeconds = currentSeconds.padStart(2, '0');

    let formatted_date =
        currentDate +
        '/' +
        currentMonth +
        '/' +
        currentYear +
        ' ' +
        currentHours +
        ':' +
        currentMinutes +
        ':' +
        currentSeconds;

    return formatted_date;
}

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Extend the Array prototype with an asyncForEach method
Array.prototype.asyncForEach = async function (fn) {
    for (let i = 0; i < this.length; i++) {
        await fn(this[i], i);
    }
};

// Define a Promise wrapper around the setTimeout function
function wait(fn, time) {
    return new Promise((resolve) =>
        setTimeout(() => {
            fn();
            resolve();
        }, time)
    );
}

// Helper: Generates script info
function scriptInfo() {
    return `[${scriptData.name} ${scriptData.version}]`;
}

// Helper: Prints universal debug information
function initDebug() {
    console.debug(`${scriptInfo()} It works ��!`);
    console.debug(`${scriptInfo()} HELP:`, scriptData.helpLink);
    console.debug(`${scriptInfo()} NOBLE_GAP:`, NOBLE_GAP);
    console.debug(`${scriptInfo()} FORMAT:`, FORMAT);
    if (DEBUG) {
        console.debug(`${scriptInfo()} Market:`, game_data.market);
        console.debug(`${scriptInfo()} World:`, game_data.world);
        console.debug(`${scriptInfo()} Screen:`, game_data.screen);
        console.debug(`${scriptInfo()} Game Version:`, game_data.majorVersion);
        console.debug(`${scriptInfo()} Game Build:`, game_data.version);
        console.debug(`${scriptInfo()} Locale:`, game_data.locale);
        console.debug(
            `${scriptInfo()} Premium:`,
            game_data.features.Premium.active
        );
    }
}

// Helper: Text Translator
function tt(string) {
    const gameLocale = game_data.locale;
    if (translations[gameLocale] !== undefined) {
        return translations[gameLocale][string];
    } else {
        return translations['en_DK'][string];
    }
}

// Initialize Script
(async function () {
    const gameScreen = getParameterByName('screen');
    const gameMode = getParameterByName('mode');
    const gameSubType = getParameterByName('subtype');

    // check that there are incomings
    if (!parseInt(game_data.player.incomings)) {
        if (jQuery('#incomings_table tbody tr.nowrap').length === 0) {
            UI.SuccessMessage(tt('It seems like you have no incomings ��'));
            return;
        }
    }

    if (
        gameScreen === 'overview_villages' &&
        gameMode === 'incomings' &&
        gameSubType === 'attacks'
    ) {
        if (jQuery('#incomings_table tbody tr.nowrap').length === 0) {
            UI.SuccessMessage(tt('It seems like you have no incomings ��'));
            return;
        }

        if (CHECK_ALL_PAGES) {
            const pagesToFetch = getPagesToFetch();
            await jQuery.getAll(
                pagesToFetch,
                function (_, data) {
                    const htmlDoc = jQuery.parseHTML(data);
                    const incomingRows = jQuery(htmlDoc).find(
                        '#incomings_table tbody tr'
                    );
                    jQuery('#incomings_table tbody:last-child').append(
                        incomingRows
                    );
                },
                async function () {
                    initIncomingsOverview();
                },
                function (error) {
                    UI.ErrorMessage('Error fetching incomings page!');
                    console.error(`${scriptInfo()} Error:`, error);
                }
            );
        } else {
            initIncomingsOverview();
        }
    } else {
        UI.InfoMessage(tt('Redirecting to Incomings page...'));
        window.location.assign(
            game_data.link_base_pure +
            'overview_villages&mode=incomings&subtype=attacks'
        );
    }
})();