module.exports = function toReadable (number) {
    let a = [
      '', 'one', 'two', 'three', 'four',
      'five', 'six', 'seven', 'eight', 'nine',
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
      'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    let b = [
      '', '', 'twenty', 'thirty', 'forty',
      'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];
    let c = [
      '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
      'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
    ];
    let Allgroup = ([ones,tens,huns]) => {
      return [
        num(huns) === 0 ? '' : a[huns] + ' hundred ',
        num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
        a[tens+ones] || a[ones]
      ].join('');
    };
    let thousand = (group,i) => group === '' ? group : `${group} ${c[i]}`;
    if (typeof number === 'number') return toReadable(String(number));
    if (number === '0') return 'zero';
    return comp (chunk(3)) (reverse) (arr(number))
      .map(makeGroup)
      .map(thousand)
      .filter(comp(not)(isEmpty))
      .reverse()
      .join(' ');  
};