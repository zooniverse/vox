import { PropTypes } from 'react';
import Issue from '../containers/Issue'

const IssueList = (props) => {
  const { issues, actions } = props;
  const list = (issues.data.length > 0) ? issues.data : [];
  return (
    <div>
      { list.map((item) =>
        <Issue
          key={item.id}
          item={item}
          actions={actions}
        />
      )}
    </div>
  );
}

IssueList.propTypes = {
  actions: PropTypes.object.isRequired,
  issues: PropTypes.object.isRequired,
};

export { IssueList as default }
