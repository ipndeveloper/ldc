import { Circuito } from './circuito';
import { Movimiento } from '../movimiento';
import { EstadosMovimiento, Actividades, Caracteristicas, Circuitos } from '../../enums/enums';
import { EstadoMovimiento } from '../estado-movimiento';


describe('Circuito', function() {
    describe('El Método validarMovimiento', function () {
        it('Retorna false si el estado del movimiento no corresponde a ninguno de los estados iniciales de la actividad', function () {

            const circuito = new Circuito();
            circuito.id = Circuitos.BahiaBlancaDescargaCamionesVarios;
            circuito.actividadesCircuito = [
                {
                    idActividad: Actividades.ControlarDescargaCamionTransportesVarios,
                    idEstadoInicial: EstadosMovimiento.PendienteControl
                }
            ];

            const estado = new EstadoMovimiento(EstadosMovimiento.AptoBalanzaEntrada, 'AptoBalanzaEntrada' );

            const movimiento = new Movimiento(circuito, estado);

            expect(circuito.validarMovimiento(movimiento)).toBe(false);
        });

        it('Retorna true si el estado del movimiento corresponde a alguno de los estados iniciales de la actividad', function () {

            const circuito = new Circuito();
            circuito.id = Circuitos.BahiaBlancaDescargaCamionesVarios;
            circuito.actividadesCircuito = [
                {
                    idActividad: Actividades.ControlarDescargaCamionTransportesVarios,
                    idEstadoInicial: EstadosMovimiento.PendienteControl
                }
            ];

            // const estado = { id: EstadosMovimiento.PendienteSupervisorControl, nombre: '' };
            const estado = new EstadoMovimiento(EstadosMovimiento.PendienteControl, 'PendienteSupervisorControl' );
            const movimiento = new Movimiento(circuito, estado);

            expect(circuito.validarMovimiento(movimiento)).toBe(true);
        });

        it('Retorna true si el movimiento es nulo y Ninguno es uno de los estados iniciales', function () {

            const circuito = new Circuito();
            circuito.id = Circuitos.BahiaBlancaDescargaCamionesVarios;
            circuito.actividadesCircuito = [
                {
                    idActividad: Actividades.ControlarDescargaCamionTransportesVarios,
                    idEstadoInicial: EstadosMovimiento.EstadoNinguno
                }
            ];

            const movimiento = null;

            expect(circuito.validarMovimiento(movimiento)).toBe(true);
        });

        it('Retorna false si el movimiento es nulo y Ninguno no es uno de los estados iniciales', function () {

            const circuito = new Circuito();
            circuito.id = Circuitos.BahiaBlancaDescargaCamionesVarios;
            circuito.actividadesCircuito = [
                {
                    idActividad: Actividades.ControlarDescargaCamionTransportesVarios,
                    idEstadoInicial: EstadosMovimiento.AptoBalanzaEntrada
                }
            ];

            const movimiento = null;

            expect(circuito.validarMovimiento(movimiento)).toBe(false);
        });
    });

    describe('El Método debeActivarCaracteristica', function () {
        it('Retorna false si el circuito no posee la caracteristica parametro habilitada', function () {

            const circuito = new Circuito();
            circuito.id = Circuitos.BahiaBlancaDescargaCamionesVarios;
            circuito.caracteristicasCircuito = [
                {
                    idCaracteristica: Caracteristicas.ConfirmaCtgControlDescargaCereales,
                    estaHabilitada: true,
                    idActividad: 1
                }
            ];

            expect(circuito.debeActivarCaracteristica([Caracteristicas.AsignarTarjetaControlDescarga])).toBe(false);
        });

        it('Retorna true si el circuito posee la caracteristica parametro habilitada', function () {

            const circuito = new Circuito();
            circuito.id = Circuitos.BahiaBlancaDescargaCamionesVarios;
            circuito.caracteristicasCircuito = [
                {
                    idCaracteristica: Caracteristicas.AsignarTarjetaControlDescarga,
                    estaHabilitada: true,
                    idActividad: 1

                }
            ];

            expect(circuito.debeActivarCaracteristica([Caracteristicas.AsignarTarjetaControlDescarga])).toBe(true);
        });

        it('Retorna false si el circuito posee la caracteristica parametro deshabilitada', () => {

            const circuito = new Circuito();
            circuito.id = Circuitos.BahiaBlancaDescargaCamionesVarios;
            circuito.caracteristicasCircuito = [
                {
                    idCaracteristica: Caracteristicas.AsignarTarjetaControlDescarga,
                    estaHabilitada: false,
                    idActividad: 1

                }
            ];

            expect(circuito.debeActivarCaracteristica([Caracteristicas.AsignarTarjetaControlDescarga])).toBe(false);
        });
    });
});

