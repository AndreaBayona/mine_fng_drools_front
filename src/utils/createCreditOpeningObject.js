import Papa from 'papaparse';

const HEADERS = {
    id: 'Referencia de archivo',
    bankId: 'NIT del Intermediario',
    debtorName: 'Razon social / Nombres y Apellidos deudor',
    debtorDocumentType: 'Tipo de identificacion del deudor',
    debtorId: 'Numero de documento Identificacion del deudor',
    debtorBirthDate: 'Fecha nacimiento o constitucion empresa',
    debtorAddress: 'Direccion deudor',
    debtorMunicipalityCode: 'Municipio deudor',
    debtorPhone: 'Telefono 1',
    debtorEmail: 'Correo electronico',
    ciiuCode: 'Codigo CIIU',
    creditReferenceId: 'Referencia del credito',
    creditReferenceCurrencyCode: 'Codigo de Moneda',
    creditReferenceAmount: 'Valor del Monto desembolsado',
    creditReferenceStartDate: 'Fecha desembolso',
    creditReferenceTermInMonths: 'Plazo de la obligacion',
    creditReferenceInterestRate: 'Tasa indexada',
    warrantyReferenceStartDate: 'Fecha valoracion garantias a favor del intermediario',
    warrantyReferenceProductWarrantyCode: 'Codigo de Producto de Garantia',
    warrantyReferenceId: 'Numero Garantia FNG',
    warrantyReferenceSupportedPercentage: 'Porcentaje de Cobertura'
};

export const createCreditOpeningObject = (csvData) => {
    // Initialize an array to store the credit quota openings
    const creditQuotaOpenings = [];
    console.log({csvData});

    // Iterate over each row of the parsed CSV data
    csvData.forEach((row, index) => {
        if(index === 0) {
            return;
        }
        console.log({row});
        console.log("row[HEADERS.debtorId]", row[HEADERS.debtorId]);
        // Create an object for the credit quota opening
        const creditQuotaOpening = {
            id: row[HEADERS.id],
            creditReference: {
                id: row[HEADERS.creditReferenceId],
                amount: parseFloat(row[HEADERS.creditReferenceAmount]),
                interestRate: parseFloat(row[HEADERS.creditReferenceInterestRate]),
                termInMonths: parseInt(row[HEADERS.creditReferenceTermInMonths]),
                status: 'Pending',
                startDate: new Date(row[HEADERS.creditReferenceStartDate]),
                currencyCode: row[HEADERS.creditReferenceCurrencyCode]
            },
            warrantyReference: {
                id: row[HEADERS.warrantyReferenceId],
                startDate: new Date(row[HEADERS.warrantyReferenceStartDate]),
                productWarrantyCode: parseInt(row[HEADERS.warrantyReferenceProductWarrantyCode]),
                supportedPercentage: parseFloat(row[HEADERS.warrantyReferenceSupportedPercentage])
            },
            debtor: {
                id: row[HEADERS.debtorId],
                idType: row[HEADERS.debtorDocumentType],
                name: row[HEADERS.debtorName],
                brithDate: new Date(row[HEADERS.debtorBirthDate]),
                address: row[HEADERS.debtorAddress],
                municipalityCode: row[HEADERS.debtorMunicipalityCode],
                phone: row[HEADERS.debtorPhone],
                email: row[HEADERS.debtorEmail],
            },
            bank: {
                name: 'Banco 1', // Default bank name
                id: parseInt(row[HEADERS.bankId])
            },
            ciiucode: row[HEADERS.ciiuCode],
        };

        // Push the credit quota opening object to the array
        creditQuotaOpenings.push(creditQuotaOpening);
    });


    return creditQuotaOpenings;
};
