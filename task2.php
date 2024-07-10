<?php

interface ICarrier
{
    public function calculateCost($weight): float|int;
}

class Carrier1 implements ICarrier
{
    public function calculateCost($weight): float|int
    {
        return ($weight < 0) ? 100 : 1000;
    }
}

class Carrier2 implements ICarrier
{
    public function calculateCost($weight): float|int
    {
        return $weight * 100;
    }
}

// Класс создающий экземпляр перевозчиков
class CarriersFactory
{
    private array $carrierNames;

    public function __construct(array $carrierNames)
    {
        $this->carrierNames = $carrierNames;
    }

// Метод возвращающий экземпляры перевозчиков в ассоциативном массиве [наименование => экземпляр перевозчика]
    public function getCarriers(): array
    {
        if (empty($this->carrierNames)) {
            throw new InvalidArgumentException('Список перевозчиков пуст');
        }


        $carriers = [];
        foreach ($this->carrierNames as $carrierName) {
            switch ($carrierName) {
                case 'Carrier1':
                    $carriers[$carrierName] = new Carrier1();
                    break;
                case 'Carrier2':
                    $carriers[$carrierName] = new Carrier2();
                    break;
                default:
                    throw new InvalidArgumentException('Неверное имя перевозчика: ' . $carrierName);
            }
        }
        return $carriers;
    }
}


class Calculator
{
    private CarriersFactory $carriersFactory;

    public function __construct(CarriersFactory $carriersFactory)
    {
        $this->carriersFactory = $carriersFactory;
    }

// Метод возвращает результаты в ассоциативном массиве [наименование перевозчика => сумма]
    public function calculateShippingCost($weight): array
    {
        $carriers = $this->carriersFactory->getCarriers();

        $res = [];
        foreach ($carriers as $key => $carrier) {
            $res[$key] = $carrier->calculateCost($weight);
        }
        return $res;
    }
}

// Функция инкапсулирует логику и возвращает результаты в ассоциативном массиве [наименование перевозчика => сумма]
function calculateCarriers($arrayCarriers, $weight): array
{
    if (!is_numeric($weight) || $weight <= 0) {
        throw new InvalidArgumentException('Вес должен быть числом и больше 0' . $weight);
    }
    if (!is_array($arrayCarriers) || empty($arrayCarriers)) {
        throw new InvalidArgumentException('Нужно передать массив и массив не должен быть пустым' . $arrayCarriers);
    }
    // Создание массива перевозчиков
    $carriersFactory = new CarriersFactory($arrayCarriers);

    // Создание экземпляра калькулятора
    $calculator = new Calculator($carriersFactory);

    // Возвращаем результат в ассоциативном массиве [наименование перевозчика => сумма]
    return $calculator->calculateShippingCost($weight);
}

// Функция для красивого вывода(необязательно)
function view($arr): void
{
    foreach ($arr as $key => $item) {
        echo $key . ' - ' . $item;
        echo '<br>';
    }
}

view(calculateCarriers(['Carrier1', 'Carrier2'], 15));

