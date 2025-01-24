import {
  checkTextWithMultipleFields,
  dcConsData,
  findNameByMatchingFields,
  imgURL,
} from '../../data';
import './theme.css';

export default function Template({ chat }) {
  return (
    <div id="chat_wrapper">
      {chat.map((item, index) => (
        <div className="chat_outer_box" key={index}>
          <div className="chat_upper_box">
            <div className="chat_nickname_box">{item.nick}</div>
          </div>
          <div className="chat_lower_box">
            <div className="chat_msg_box">
              {checkTextWithMultipleFields(item.msg, '~', dcConsData, [
                'keywords',
              ]) ? (
                <img
                  className="dccon"
                  src={`${imgURL}${findNameByMatchingFields(
                    item.msg,
                    '~',
                    dcConsData,
                    ['keywords']
                  )}`}
                />
              ) : (
                item.msg
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
