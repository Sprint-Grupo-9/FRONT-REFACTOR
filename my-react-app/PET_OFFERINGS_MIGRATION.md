# 🔄 Migração de Services para Pet Offerings

## 📋 Resumo da Mudança

O backend alterou a estrutura de **Services** para **Pet Offerings** (Ofertas de Serviços para Pets). Esta mudança reflete melhor a arquitetura do sistema e a relação entre pets e os serviços oferecidos.

## 🔧 Mudanças na API

### Endpoints Antigos → Novos

| Endpoint Antigo | Endpoint Novo | Descrição |
|----------------|---------------|-----------|
| `GET /api/services` | `GET /api/pet-offerings` | Lista todos os procedimentos |
| `GET /api/services/{id}` | `GET /api/pet-offerings/{id}` | Busca procedimento por ID |
| `GET /api/services/employees?serviceIds=...` | `GET /api/pet-offerings/price/{petId}?petOfferingIds=...` | Busca preços por pet |

### Nova Estrutura de Resposta

#### PetOfferingResponseDto
```json
{
  "id": 1,
  "name": "Banho",
  "description": "Banho completo para seu pet"
}
```

#### PetOfferingWithPriceResponseDto
```json
{
  "id": 1,
  "name": "Banho",
  "description": "Banho completo para seu pet",
  "price": 50.00,
  "petId": 123
}
```

## 📝 Mudanças no Frontend

### Arquivo: `src/services/api.js`

#### ✅ Novas Funções (Recomendadas)

```javascript
// Buscar todos os procedimentos/ofertas
export const getAllPetOfferings = async () => {
    return await api.get('/pet-offerings');
};

// Buscar procedimento por ID
export const getPetOfferingById = async (id) => {
    return await api.get(`/pet-offerings/${id}`);
};

// Buscar preços dos procedimentos para um pet específico
export const getPetOfferingsPricesByPet = async (petId, petOfferingIds) => {
    const params = new URLSearchParams({
        petOfferingIds: petOfferingIds.join(',')
    });
    return await api.get(`/pet-offerings/price/${petId}?${params}`);
};
```

#### ⚠️ Funções Deprecated (Compatibilidade Temporária)

As funções antigas ainda funcionam, mas exibem aviso no console:

```javascript
// ❌ Deprecated - Use getAllPetOfferings
export const getAllServices = async () => { ... };

// ❌ Deprecated - Use getPetOfferingById
export const getServiceById = async (id) => { ... };

// ❌ Deprecated - Funcionalidade será alterada
export const getEmployeesByServices = async (serviceIds) => { ... };
```

## 🚀 Como Migrar Seu Código

### Exemplo 1: Listar Procedimentos

**ANTES:**
```javascript
import { getAllServices } from '../services/api';

const fetchServices = async () => {
    const response = await getAllServices();
    setServices(response.data);
};
```

**DEPOIS:**
```javascript
import { getAllPetOfferings } from '../services/api';

const fetchPetOfferings = async () => {
    const response = await getAllPetOfferings();
    setPetOfferings(response.data);
};
```

### Exemplo 2: Buscar Preços por Pet

**ANTES:**
```javascript
import { getEmployeesByServices } from '../services/api';

const fetchEmployees = async (serviceIds) => {
    const response = await getEmployeesByServices(serviceIds);
    setEmployees(response.data);
};
```

**DEPOIS:**
```javascript
import { getPetOfferingsPricesByPet } from '../services/api';

const fetchPrices = async (petId, petOfferingIds) => {
    const response = await getPetOfferingsPricesByPet(petId, petOfferingIds);
    setPrices(response.data);
};
```

### Exemplo 3: Buscar por ID

**ANTES:**
```javascript
import { getServiceById } from '../services/api';

const fetchService = async (id) => {
    const response = await getServiceById(id);
    setService(response.data);
};
```

**DEPOIS:**
```javascript
import { getPetOfferingById } from '../services/api';

const fetchPetOffering = async (id) => {
    const response = await getPetOfferingById(id);
    setPetOffering(response.data);
};
```

## 📂 Arquivos que Precisam Ser Atualizados

### 1. ✅ `src/services/api.js`
- **Status:** Atualizado com compatibilidade
- **Ação:** Nenhuma (já atualizado)

### 2. 🔄 `src/pages/Agendamentos/AppointmentPage.jsx`
- **Linha 9:** Importa `getAllServices`
- **Linha 71:** Usa `getAllServices()`
- **Ação Recomendada:** Migrar para `getAllPetOfferings`

### 3. 🔄 `src/components/contents/AppointmentContent.jsx`
- **Linhas 4-5:** Importa `getAllServices` e `getEmployeesByServices`
- **Linha 44:** Usa `getAllServices()`
- **Linha 83:** Usa `getEmployeesByServices()`
- **Ação Recomendada:** Migrar para novas funções

### 4. 🔄 `src/components/contents/CalendarContent.jsx`
- **Linhas 10-11:** Importa `getAllServices` e `getEmployeesByServices`
- **Linha 49:** Usa `getAllServices()`
- **Linha 88:** Usa `getEmployeesByServices()`
- **Ação Recomendada:** Migrar para novas funções

### 5. 🔄 `src/components/contents/ServicesContent.jsx`
- **Linha 8:** Importa `getAllServices`
- **Linha 19:** Usa `getAllServices()`
- **Ação Recomendada:** Migrar para `getAllPetOfferings`

### 6. 🔄 `src/pages/SystemAppointments.jsx`
- **Linha 182:** Usa `appointment.services`
- **Ação Recomendada:** Verificar se a propriedade permanece igual na API

## 🎯 Plano de Migração Recomendado

### Fase 1: Compatibilidade (Atual) ✅
- Mantém funções antigas funcionando
- Adiciona avisos de deprecation
- Permite migração gradual

### Fase 2: Migração Gradual (Próximos dias)
1. Atualizar `AppointmentPage.jsx`
2. Atualizar `ServicesContent.jsx`
3. Atualizar `AppointmentContent.jsx`
4. Atualizar `CalendarContent.jsx`
5. Testar cada componente após atualização

### Fase 3: Limpeza (Futuro)
- Remover funções deprecated
- Atualizar documentação
- Revisar testes

## ⚠️ Pontos de Atenção

### 1. **Mudança de Nomenclatura**
- `services` → `petOfferings` ou `offerings`
- `serviceIds` → `petOfferingIds`
- Ajustar nomes de variáveis para consistência

### 2. **Preços por Pet**
- Agora os preços são calculados POR PET
- Necessário informar o `petId` para obter preços
- Preços podem variar por tamanho/tipo de pet

### 3. **Funcionários**
- A busca de funcionários pode ter mudado
- Verificar nova lógica de disponibilidade
- Pode estar integrada com preços

### 4. **Campos do Agendamento**
```javascript
// Possível mudança na estrutura
const appointmentData = {
    petId: 123,
    petOfferingIds: [1, 2, 3], // Era serviceIds
    // ... outros campos
};
```

## 🧪 Testes Recomendados

### Testes Manuais
- [ ] Listar todos os procedimentos
- [ ] Selecionar procedimentos para agendamento
- [ ] Verificar cálculo de preços por pet
- [ ] Criar agendamento com novos procedimentos
- [ ] Editar agendamento existente
- [ ] Visualizar histórico de agendamentos

### Testes de Integração
- [ ] Verificar compatibilidade com backend
- [ ] Testar fluxo completo de agendamento
- [ ] Validar cálculo de preços
- [ ] Confirmar disponibilidade de funcionários

## 📚 Recursos Adicionais

### Controller Backend
```java
@RestController
@RequestMapping("/api/pet-offerings")
public class PetOfferingController {
    
    @GetMapping
    public ResponseEntity<List<PetOfferingResponseDto>> getAllPetOfferings() { ... }
    
    @GetMapping("/price/{petId}")
    public ResponseEntity<List<PetOfferingWithPriceResponseDto>> 
        getPetOfferingsPricesOfPet(
            @PathVariable Integer petId,
            @RequestParam List<Integer> petOfferingIds
        ) { ... }
}
```

### DTOs
```java
// PetOfferingResponseDto
public class PetOfferingResponseDto {
    private Integer id;
    private String name;
    private String description;
}

// PetOfferingWithPriceResponseDto
public class PetOfferingWithPriceResponseDto {
    private Integer id;
    private String name;
    private String description;
    private Double price;
    private Integer petId;
}
```

## 🐛 Troubleshooting

### Problema: Erro 404 ao buscar serviços
**Solução:** Verifique se está usando `/pet-offerings` ao invés de `/services`

### Problema: Preços não aparecem
**Solução:** Certifique-se de passar o `petId` ao buscar preços

### Problema: Console com avisos de deprecation
**Solução:** Migre para as novas funções (`getAllPetOfferings`, etc.)

### Problema: Agendamentos antigos não carregam
**Solução:** Backend deve manter compatibilidade com dados antigos

## 📞 Suporte

Em caso de dúvidas ou problemas:
1. Verifique este documento
2. Consulte a documentação do backend
3. Teste os endpoints no Swagger/Postman
4. Entre em contato com o time de backend

---

**Data da Migração:** Novembro 2025  
**Versão:** 1.0  
**Status:** Em andamento 🔄
