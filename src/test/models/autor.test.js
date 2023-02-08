import {
  describe, expect, it, jest,
} from '@jest/globals';
import Autor from '../../models/autor.js';

describe('Testando o modelo Autor', () => {
  const objetoAutor = {
    nome: 'Lygia Fagundes Telles',
    nacionalidade: 'brasileira',
  };

  it('Deve instanciar um novo autor', () => {
    const autor = new Autor(objetoAutor);

    expect(autor).toEqual(
      expect.objectContaining(objetoAutor),
    );
  });

  it.skip('Deve salvar autor no BD', async () => {
    const autor = new Autor(objetoAutor);

    const dados = await autor.salvar();

    const retornado = await Autor.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoAutor,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve fazer uma chamada simulada ao BD', () => {
    const autor = new Autor(objetoAutor);

    autor.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'Lygia Fagundes Telles',
      nacionalidade: 'brasileira',
      genero: null,
      created_at: '2022-10-01',
      updated_at: '2022-10-01',
    });

    const retorno = autor.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoAutor,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
