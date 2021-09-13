const { expect } = require( 'chai' );
const { processData, printData } = require( './main.js' )

describe( 'Coding Test', () => {
    describe( 'processData function', () => {
        it( 'Should return empty array when not provided any data', () => {
            const results = processData( [] );

            expect( results ).to.be.an( "array" );
            expect( results.length ).eq( 0 );
        } );

        it( 'Should return error message', () => {
            const results = processData();

            expect( results ).eq( "Invalid data, unable to process." );
        } );

        it( 'Should return array of person objects', () => {
            const test = [
                "(Name)John Doe",
                "(Age)20",
                "(City)Ashtabula, OH",
                "(Flags)NYN",
                "",
                "",
                "(Name)Jane Doe",
                "(City)Rochester",
                "(Flags)YYN",
                "",
            ];

            const results = processData( test );

            expect( results ).to.be.an( "array" );
            expect( results.length ).eq( 2 );

            let person = results[ 0 ];

            expect( person.name ).eq( 'John Doe' );
            expect( person.age ).eq( '20' );
            expect( person.city ).eq( 'Ashtabula' );
            expect( person.state ).eq( 'OH' );
            expect( person.isFemale ).to.be.false;
            expect( person.isEmployee ).to.be.false;
            expect( person.isStudent ).to.be.true;

            person = results[ 1 ];

            expect( person.name ).eq( 'Jane Doe' );
            expect( person.city ).eq( 'Rochester' );
            expect( person.state ).eq( 'N/A' );
            expect( person.isFemale ).to.be.true;
            expect( person.isEmployee ).to.be.false;
            expect( person.isStudent ).to.be.true;
        } );
    } );

    describe( 'printData function', () => {
        it( 'Should return properly formatted data', () => {
            const mockData = [
                {
                    name: 'John Doe',
                    city: 'Rochester',
                    state: 'NY',
                    age: '25',
                    isStudent: true,
                    isFemale: false,
                    isEmployee: true
                }
            ];
            const summary = printData( mockData );

            expect( summary ).to.include( 'John Doe [25, Male]' );
            expect( summary ).to.include( 'Student : Yes' );
            expect( summary ).to.include( 'Employee : Yes' );
        } )
    } );
} );