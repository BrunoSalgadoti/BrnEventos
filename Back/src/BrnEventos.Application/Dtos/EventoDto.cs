using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BrnEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório!")]
        public string Local { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório!")]
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório!"),
        //MinLength(4, ErrorMessage = "{0} deve conter no mínimo 5 caracteres!"),
        //MaxLength(55, ErrorMessage = "{0} deve conter no máximo 55 caracteres!")
        StringLength(55, MinimumLength = 4,
                         ErrorMessage = "Intervalo permitido entre 4 a 50 caracteres!")]
        public string Tema { get; set; }

        [Range(1, 120000, ErrorMessage = "{0} não pode ser menor que 1 e maior que 120.000 "),
        Display(Name = "Qtd Pessoas")]
        public int QtdPessoas { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório!")]
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
                           ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp, png)")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório!"),
        Phone(ErrorMessage = "O Campo {0} está com número inválido!")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório!"),
        EmailAddress(ErrorMessage = "O {0} digitado é inválido!"),
        Display(Name = "E-mail")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> PalestrantesEventos { get; set; }
    }
}