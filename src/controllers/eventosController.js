import Evento from '../models/evento.js';
import unleash from '../services/unleash.js';

class EventosController {
  static liberaAcessoEventos = () => unleash.isEnabled('eventos');

  static listarEventos = async (req, res) => {
    if (this.liberaAcessoEventos()) {
      try {
        const resultado = await Evento.pegarEventos();
        return res.status(200).json(resultado);
      } catch (err) {
        return res.status(500).json(err.message);
      }
    } else {
      return res.status(404).send();
    }
  };
}

export default EventosController;
