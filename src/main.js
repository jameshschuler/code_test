const fs = require( "fs" );

function loadData () {
    try {
        const path = process.argv[ 2 ] || 'sample_input.txt';
        const data = fs.readFileSync( path, 'utf8' );

        if ( !data || data.length === 0 ) {
            console.log( 'Invalid data, unable to process.' );
            return;
        }

        return data;
    } catch ( err ) {
        console.error( 'Invalid data, unable to process.' );
    }
}

function printData ( people ) {
    people.forEach( ( { city, state, name, age, isFemale, isEmployee, isStudent } ) => {
        let sex = isFemale ? 'Female' : 'Male';
        let displayedAge = age ? `${age}, ` : '';

        console.log( `${name} [${displayedAge}${sex}]` );
        console.log( `\tCity : ${city}` );
        console.log( `\tState : ${state}` );
        console.log( `\tStudent : ${isStudent ? 'Yes' : 'No'}` );
        console.log( `\tEmployee : ${isEmployee ? 'Yes' : 'No'}` );
        console.log( '\n' )
    } );
}

function processData () {
    let data = loadData();
    let parsed = data.split( /\r?\n/ );

    let people = [];
    let currentPerson = {};

    for ( let i = 0; i < parsed.length; i++ ) {
        let field = parsed[ i ];

        if ( field === '' || i + 1 === parsed.length ) {
            people.push( currentPerson );
            currentPerson = {};
            continue;
        }

        if ( field.includes( '(Name)' ) ) {
            currentPerson.name = field.split( '(Name)' )[ 1 ];
        } else if ( field.includes( '(Age)' ) ) {
            currentPerson.age = field.split( '(Age)' )[ 1 ];
        } else if ( field.includes( '(City)' ) ) {
            let location = field.split( '(City)' )[ 1 ];
            if ( location ) {
                const locationData = location.split( ',' );
                currentPerson.city = locationData[ 0 ] || 'N/A';
                currentPerson.state = locationData[ 1 ] ? locationData[ 1 ].trim() : 'N/A';
            }
        } else if ( field.includes( '(Flags)' ) ) {
            currentPerson.flags = field.split( '(Flags)' )[ 1 ];

            if ( currentPerson.flags !== '' ) {
                currentPerson.isFemale = currentPerson.flags[ 0 ] === 'Y';
                currentPerson.isStudent = currentPerson.flags[ 1 ] === 'Y';
                currentPerson.isEmployee = currentPerson.flags[ 2 ] === 'Y';
            }
        }
    }

    let filtered = people.filter( value => Object.keys( value ).length !== 0 );

    printData( filtered );
}

try {
    processData();
} catch ( err ) { }