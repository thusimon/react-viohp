/**
 * Created by Lu on 8/3/2018.
 */
import React from 'react';
import './about.scss';
class AboutPage extends React.Component {
  render(){
    return (
      <div className='about-page-main'>
        <table>
          <tbody>
            <tr>
              <td>Version</td>
              <td>0.1.0</td>
            </tr>
            <tr>
              <td>Test</td>
              <td>Only tested on latest Chrome and Firefox</td>
            </tr>
            <tr>
              <td>Compose</td>
              <td>{
`Each note symbol is an object with key t/n/a/s
t means symbol type, currently you can use the following symbols:
w(whole note), h(half note), Rh(reversed half note), q(quarter note), Rq(reversed quarter note), e(eighth note), Re(reversed eight note), |(vertial bar), rw(whole rest), rh(half rest), rq(quarter rest), re(eighth rest)
please note the type values case sensitive
n means note name, such as a4, e5, as violin position one, you can choose from g3 to b5
a means note is extended, if assigned value '.', meaning the note length is extended (with a dot on the score)
s means scale, currently you can use s(sharp), b(flat), n(neutral)
For example {t:'Rh', n:'e5b', a:'.', s:'n'} will draw a reversed half symbol as E5 flat note, with a extend dot and a neutral sign
Each staff line is an array of note symbols
And the whole score is an array of staff lines
For example, paste the following in the note editor:
[
  [{t:'w',n:'c4'},{t:'h',n:'d4'},{t:'Rh',n:'e4'},{t:'|'},{t:'q',n:'f4'},{t:'Rq',n:'g4'}],
  [{t:'e',n:'a4',a:'.',s:'s'},{t:'Re',n:'b4',a:'.',s:'b'},{t:'w',n:'c5',s:'n'}]
]`}
              </td>
            </tr>
            <tr>
              <td>Credit</td>
              <td>Thanks to <a target='_blank' href='https://keithwhor.com/music/'>https://keithwhor.com/music</a> for music instrument synthesizing</td>
            </tr>
            <tr>
              <td>Src</td>
              <td><a target='_blank' href='https://github.com/thusimon/react-viohp'>https://github.com/thusimon/react-viohp</a></td>
            </tr>
          </tbody>
        </table>
        <div className='motto'>早服还丹无世情 琴心三叠道初成</div>
      </div>
    );
  }
}

export default AboutPage;
