const fs = require( "fs" );

function loadData ( path ) {
    try {
        const data = fs.readFileSync( path, 'utf8' );

        if ( !data || data.length === 0 ) {
            console.error( 'Invalid data, unable to process.' );
            return;
        }

        return data;
    } catch ( err ) {
        console.error( 'Invalid data, unable to process.' );
    }
}

function printData ( people ) {
    let summary = '';
    people.forEach( ( { city, state, name, age, isFemale, isEmployee, isStudent } ) => {
        let sex = isFemale ? 'Female' : 'Male';
        let displayedAge = age ? `${age}, ` : '';

        summary += `${name} [${displayedAge}${sex}]`;
        summary += `\n\tCity : ${city}`;
        summary += `\n\tState : ${state}`;
        summary += `\n\tStudent : ${isStudent ? 'Yes' : 'No'}`;
        summary += `\n\tEmployee : ${isEmployee ? 'Yes' : 'No'}`;
        summary += '\n\n';
    } );

    console.log( summary );
    return summary;
}

function processData ( data ) {
    if ( !data ) {
        return 'Invalid data, unable to process.';
    }

    let people = [];
    let currentPerson = {};

    for ( let i = 0; i < data.length; i++ ) {
        let field = data[ i ];

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

        if ( field === '' || i + 1 === data.length ) {
            people.push( currentPerson );
            currentPerson = {};
            continue;
        }
    }

    return people.filter( value => Object.keys( value ).length !== 0 );
}

try {
    const path = process.argv[ 2 ] || 'sample_input.txt';
    const data = loadData( path );

    const results = processData( data.split( /\r?\n/ ) );
    printData( results );
} catch ( err ) { }


module.exports = {
    loadData,
    processData,
    printData
}