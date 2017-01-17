'use strict';

var TaxCodeValidator = function () {};

TaxCodeValidator.prototype.isValidTaxCode = function(taxCode) {
    return this.isStandardTaxCode(taxCode) ||
        !this.isTaxableCode(taxCode) ||
        this.isBasicRateTaxCode(taxCode) ||
        this.isEmergencyTaxCode(taxCode) ||
        this.isScottishTaxCode(taxCode) ||
        this.isUnTaxedIncomeTaxCode(taxCode);
};

TaxCodeValidator.prototype.isStandardTaxCode = function(taxCode) {
    var re = /^([0-9]{1,4}[L-N,T]{1}){1}$/;
    return re.test(taxCode);
};

TaxCodeValidator.prototype.isTaxableCode = function(taxCode) {
    var re = /^([N][T]){1}$/;
    return !re.test(taxCode) && !this.isBasicRateTaxCode(taxCode);
};

TaxCodeValidator.prototype.isBasicRateTaxCode = function(taxCode) {
    var reA = /^([B][R]){1}$/;
    var reB = /^([D][0,1]){1}$/;
    return reA.test(taxCode) || reB.test(taxCode);
};

TaxCodeValidator.prototype.isEmergencyTaxCode = function(taxCode) {
    var re = /^([1]{2}[0]{2}[L]{1}){1}$/;
    return re.test(taxCode);
};

TaxCodeValidator.prototype.isScottishTaxCode = function(taxCode) {
    var reA = /^([S]{1}[0-9]{1,4}[L-N,T]{1}){1}$/;
    var reB = /^([S][B][R]){1}$/;
    var reC = /^([S][D][0,1]){1}$/;
    var reD = /^([S][K][0-9]{1,4}){1}$/;

    return reA.test(taxCode) || reB.test(taxCode) || reC.test(taxCode) || reD.test(taxCode);
};

TaxCodeValidator.prototype.isUnTaxedIncomeTaxCode = function(taxCode) {
    var re = /^([S]?[K]{1}[0-9]{1,4}){1}$/;
    return re.test(taxCode);
};

module.exports = new TaxCodeValidator();