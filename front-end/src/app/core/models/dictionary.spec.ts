import { TestBed } from '@angular/core/testing';

import { TestModule } from '../../core/mocks/test.module';
import { Dictionary } from './dictionary';

describe('Dictionary', () => {
    let dictionary: Dictionary<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        dictionary = new Dictionary<any>();
    });

    describe('El metodo add', () => {
        it('agrega una property con el key', () => {
            // Arrange
            const key = 'prueba';
            const value: any = 1;

            // Act
            dictionary.add(key, value);

            // Assert
            expect(dictionary.hasOwnProperty(key)).toBeTruthy();
        });

        it('agrega una property con el value', () => {
            // Arrange
            const key = 'prueba';
            const value: any = 1;

            // Act
            dictionary.add(key, value);

            // Assert
            expect(dictionary[key]).toBe(value);
        });

        it('sobreescribe el value de una key existente', () => {
            // Arrange
            const key = 'prueba';
            const valueOriginal: any = 2;
            const value: any = 1;
            dictionary[key] = valueOriginal;

            // Act
            dictionary.add(key, value);

            // Assert
            expect(dictionary[key]).toBe(value);
        });
    });

    describe('El metodo item', () => {
        it('devuelve el value de la key cuando existe', () => {
            // Arrange
            const key = 'prueba';
            const value: any = 1;
            dictionary[key] = value;

            // Act
            const resultado = dictionary.item(key);

            // Assert
            expect(resultado).toBe(value);
        });

        it('devuelve undefined cuando no existe la key', () => {
            // Arrange
            const key = 'prueba';

            // Act
            const resultado = dictionary.item(key);

            // Assert
            expect(resultado).toBe(undefined);
        });
    });

    describe('El metodo count', () => {
        it('devuelve la cantidad de items agregados []', () => {
            // Arrange
            dictionary['k1'] = 1;
            dictionary['k2'] = 2;

            // Act
            const resultado = dictionary.count();

            // Assert
            expect(resultado).toBe(2);
        });

        it('devuelve la cantidad de items agregados con add', () => {
            // Arrange
            dictionary.add('k1', 1);
            dictionary.add('k2', 2);

            // Act
            const resultado = dictionary.count();

            // Assert
            expect(resultado).toBe(2);
        });
    });

    describe('El metodo keys', () => {
        it('devuelve todas las keys propias del dictionary', () => {
            // Arrange
            dictionary['k1'] = 1;
            dictionary['k2'] = 2;

            // Act
            const resultado = dictionary.keys();

            // Assert
            expect(resultado).toEqual(['k1', 'k2']);
        });
    });

    describe('El metodo values', () => {
        it('devuelve todos los values del dictionary', () => {
            // Arrange
            dictionary['k1'] = 1;
            dictionary['k2'] = 2;

            // Act
            const resultado = dictionary.values();

            // Assert
            expect(resultado).toEqual([1, 2]);
        });
    });

    describe('El metodo containsKey', () => {
        it('devuelve true cuando la key existe', () => {
            // Arrange
            const key = 'prueba';
            const value: any = 1;
            dictionary[key] = value;

            // Act
            const resultado = dictionary.containsKey(key);

            // Assert
            expect(resultado).toBeTruthy();
        });

        it('devuelve false cuando la key no existe', () => {
            // Arrange

            // Act
            const resultado = dictionary.containsKey('key');

            // Assert
            expect(resultado).toBeFalsy();
        });
    });

    describe('El metodo remove', () => {
        it('elimina el elemento con la key', () => {
            // Arrange
            const key = 'prueba';
            const value: any = 1;
            dictionary[key] = value;

            // Act
            dictionary.remove(key);

            // Assert
            expect(dictionary.containsKey(key)).toBeFalsy();
        });
    });

});
