import { IMalfunction } from '@/entities';
import { IServicedStore } from '@/entities/servicedStore.entity';
import { WithoutGenerated } from '@/types/utils/utils.types';
import { randCompanyName, randFullAddress, randPhoneNumber } from '@ngneat/falso';
import { randomInt } from 'crypto';

export const malfunctionFixture: WithoutGenerated<IMalfunction>[] = [
  {
    description: 'Не включается ноутбук',
    price: randomInt(200, 7000),
    repairMethod: 'Замена блока питания, диагностика материнской платы',
    symptoms: 'Не реагирует на кнопку включения, нет индикации',
  },
  {
    description: 'Телефон не заряжается',
    price: randomInt(200, 7000),
    repairMethod: 'Чистка разъема, замена гнезда зарядки',
    symptoms: 'Зарядка подключается, но заряд не идет',
  },
  {
    description: 'Холодильник не охлаждает',
    price: randomInt(200, 7000),
    repairMethod: 'Замена компрессора, заправка фреоном',
    symptoms: 'Продукты теплые, мотор работает без остановки',
  },
  {
    description: 'Стиральная машина течет',
    price: randomInt(200, 7000),
    repairMethod: 'Замена помпы, уплотнителя люка',
    symptoms: 'Вода под машиной после стирки',
  },
  {
    description: 'Телевизор нет изображения',
    price: randomInt(200, 7000),
    repairMethod: 'Замена матрицы или подсветки',
    symptoms: 'Есть звук, но экран черный',
  },
  {
    description: 'Микроволновка не греет',
    price: randomInt(200, 7000),
    repairMethod: 'Замена магнетрона или высоковольтного диода',
    symptoms: 'Работает, но пища остается холодной',
  },
  {
    description: 'Пылесос слабая тяга',
    price: randomInt(200, 7000),
    repairMethod: 'Чистка фильтров, замена мешка для пыли',
    symptoms: 'Шумит, но плохо всасывает',
  },
  {
    description: 'Кондиционер не холодит',
    price: randomInt(200, 7000),
    repairMethod: 'Дозаправка фреоном, чистка теплообменника',
    symptoms: 'Дует, но воздух теплый',
  },
  {
    description: 'Принтер зажевывает бумагу',
    price: randomInt(200, 7000),
    repairMethod: 'Чистка роликов подачи, замена термопленки',
    symptoms: 'Бумага мнется и застревает',
  },
  {
    description: 'Планшет не реагирует на касания',
    price: randomInt(200, 7000),
    repairMethod: 'Замена тачскрина',
    symptoms: 'Изображение есть, но сенсор не работает',
  },
  {
    description: 'Наушники не работают на одном канале',
    price: randomInt(200, 7000),
    repairMethod: 'Замена штекера или динамика',
    symptoms: 'Звук только в одном ухе',
  },
  {
    description: 'Монитор полосы на экране',
    price: randomInt(200, 7000),
    repairMethod: 'Замена матрицы или шлейфа',
    symptoms: 'Цветные полосы или артефакты',
  },
  {
    description: 'Кофемашина не набирает воду',
    price: randomInt(200, 7000),
    repairMethod: 'Чистка водяного насоса, замена клапанов',
    symptoms: 'Журчание, но вода не поступает',
  },
  {
    description: 'Игровая консоль перегревается',
    price: randomInt(200, 7000),
    repairMethod: 'Чистка от пыли, замена термопасты',
    symptoms: 'Выключается через 10-15 минут игры',
  },
  {
    description: 'Фен не дует горячим воздухом',
    price: randomInt(200, 7000),
    repairMethod: 'Замена нагревательного элемента',
    symptoms: 'Дует, но воздух холодный',
  },
  {
    description: 'Электрочайник не выключается',
    price: randomInt(200, 7000),
    repairMethod: 'Замена термостата',
    symptoms: 'Кипятит воду без остановки',
  },
  {
    description: 'Роутер не раздает Wi-Fi',
    price: randomInt(200, 7000),
    repairMethod: 'Прошивка, замена антенн',
    symptoms: 'Индикаторы горят, но сети нет',
  },
  {
    description: 'Клавиатура не работают некоторые клавиши',
    price: randomInt(200, 7000),
    repairMethod: 'Чистка контактов, замена мембраны',
    symptoms: 'Отдельные кнопки не срабатывают',
  },
  {
    description: 'Мышь двойной клик',
    price: randomInt(200, 7000),
    repairMethod: 'Замена микрика (кнопки)',
    symptoms: 'Один клик регистрируется как двойной',
  },
  {
    description: 'Вентилятор не вращается',
    price: randomInt(200, 7000),
    repairMethod: 'Замена двигателя или смазка подшипников',
    symptoms: 'Гудит, но лопасти не движутся',
  },
  {
    description: 'Блендер не измельчает',
    price: randomInt(200, 7000),
    repairMethod: 'Замена редуктора или ножей',
    symptoms: 'Шумит, но содержимое не перемешивается',
  },
  {
    description: 'Утюг не парит',
    price: randomInt(200, 7000),
    repairMethod: 'Чистка от накипи, замена парогенератора',
    symptoms: 'Греет, но пар не выходит',
  },
  {
    description: 'Посудомойка не сливает воду',
    price: randomInt(200, 7000),
    repairMethod: 'Чистка сливного насоса, замена помпы',
    symptoms: 'Вода остается в камере после цикла',
  },
  {
    description: 'Музыкальный центр нет звука',
    price: randomInt(200, 7000),
    repairMethod: 'Замена усилителя или динамиков',
    symptoms: 'Работает, но звука нет',
  },
  {
    description: 'Электроплита не греет одна конфорка',
    price: randomInt(200, 7000),
    repairMethod: 'Замена ТЭНа или переключателя',
    symptoms: 'Другие конфорки работают, эта - нет',
  },
  {
    description: 'Духовка не держит температуру',
    price: randomInt(200, 7000),
    repairMethod: 'Замена терморегулятора или датчика',
    symptoms: 'Перегревается или недогревает',
  },
  {
    description: 'Мультиварка не включается',
    price: randomInt(200, 7000),
    repairMethod: 'Замена блока управления или шнура питания',
    symptoms: 'Полностью не реагирует на кнопки',
  },
  {
    description: 'Электронные весы показывают ошибку',
    price: randomInt(200, 7000),
    repairMethod: 'Калибровка, замена датчиков',
    symptoms: 'На дисплее "Err" или неверные показания',
  },
  {
    description: 'Проектор размытое изображение',
    price: randomInt(200, 7000),
    repairMethod: 'Чистка линз, замена лампы',
    symptoms: 'Картинка не в фокусе',
  },
  {
    description: 'Фитнес-браслет не заряжается',
    price: randomInt(200, 7000),
    repairMethod: 'Замена аккумулятора или контактов',
    symptoms: 'Не реагирует на зарядное устройство',
  },
];
