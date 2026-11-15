const renderInline = (text, keyPrefix) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    return <span key={key}>{part}</span>;
  });
};

const MessageContent = ({ text }) => {
  const lines = text.split(/\r?\n/);
  const blocks = [];
  let list = null;
  let listType = null;
  let blockIndex = 0;

  const flushList = () => {
    if (!list) return;
    const ListTag = listType === 'ol' ? 'ol' : 'ul';
    blocks.push(
      <ListTag key={`list-${blockIndex++}`} className="chat-message__list">
        {list}
      </ListTag>,
    );
    list = null;
    listType = null;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    const bullet = /^[-*•]\s+(.*)$/.exec(trimmed);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(trimmed);

    if (bullet || numbered) {
      const nextType = bullet ? 'ul' : 'ol';
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      list ??= [];
      list.push(
        <li key={`item-${index}`}>
          {renderInline((bullet || numbered)[1], `item-${index}`)}
        </li>,
      );
      return;
    }

    flushList();
    const heading = /^#{1,4}\s+(.*)$/.exec(trimmed);
    if (heading) {
      blocks.push(
        <h4 key={`heading-${index}`} className="chat-message__heading">
          {renderInline(heading[1], `heading-${index}`)}
        </h4>,
      );
      return;
    }

    blocks.push(
      <p key={`paragraph-${index}`} className="chat-message__paragraph">
        {renderInline(trimmed, `paragraph-${index}`)}
      </p>,
    );
  });

  flushList();

  return <div className="chat-message__rich">{blocks}</div>;
};

export default MessageContent;
