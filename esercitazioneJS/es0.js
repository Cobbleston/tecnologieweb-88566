function f1()
{
    var c1elements = document.getElementsByClassName("C1");
    var c2elements = document.getElementsByClassName("C2");

    var array_1 = [];
    var array_2 = [];
    var array_index = 0;

    for (var i = 0; i < c1elements.length; i++)
    {
        var chiave = 'key_' + array_index;
        array_1[chiave] = c1elements[i].innerHTML;
        array_index++;
    }
    for (var i = 0; i < c2elements.length; i++)
    {
        var chiave = 'key_' + array_index;
        array_1[chiave] = c2elements[i].innerHTML;
        array_index++;
    }

    for (var key in array_1)
    {
        chiave_new = key + 'placeholder';
        array_2[chiave_new] = array_1[key];
    }

    return array_1, array_2;
}