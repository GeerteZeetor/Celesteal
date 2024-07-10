<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<?php
$entities = [
    [
        'name' => 'item1',
        'img' => 'img',
        'description' => 'description'
    ],
    [
        'name' => 'item2',
        'img' => '',
        'description' => 'description'
    ],
    [
        'name' => 'item3',
        'img' => 'img',
        'description' => ''
    ],
    [
        'name' => 'item4',
        'img' => '',
        'description' => ''
    ]
];
?>

<table border="1">
  <tr>
    <th>Name</th>
    <th>Image</th>
    <th>Description</th>
  </tr>
    <?php foreach ($entities as $entity): ?>
      <tr>
        <td><?= $entity['name'] ?></td>
        <td>
            <?php if (!empty($entity['img'])): ?>
              <?= $entity['img'] ?>
            <?php endif; ?>
        </td>
        <td>
            <?php if (!empty($entity['description'])): ?>
                <?= $entity['description'] ?>
            <?php endif; ?>
        </td>
      </tr>
    <?php endforeach; ?>
</table>

</body>
</html>