import { LightningElement, track } from 'lwc';

export default class CpfInput extends LightningElement {
    @track errorMessage = '';

    handleInputChange(event) {
        const cpf = event.target.value;

        if (cpf && !this.validateCPF(cpf)) {
            this.errorMessage = 'CPF inválido';
        } else {
            this.errorMessage = '';
        }
    }

    validateCPF(cpf) {
        // Remover caracteres especiais do CPF
        cpf = cpf.replace(/[^\d]/g, '');

        // Verificar se o CPF tem o tamanho correto
        if (cpf.length !== 11) {
            return false;
        }

        // Verificar se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }

        // Verificar o primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }

        let remainder = sum % 11;
        if (remainder === 0 || remainder === 1) {
            if (parseInt(cpf.charAt(9)) !== 0) {
                return false;
            }
        } else {
            if (parseInt(cpf.charAt(9)) !== 11 - remainder) {
                return false;
            }
        }

        // Verificar o segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }

        remainder = sum % 11;
        if (remainder === 0 || remainder === 1) {
            if (parseInt(cpf.charAt(10)) !== 0) {
                return false;
            }
        } else {
            if (parseInt(cpf.charAt(10)) !== 11 - remainder) {
                return false;
            }
        }

        return true;
    }
}