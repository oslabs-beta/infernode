/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export function HelpFlamegraphs(): JSX.Element {
  return (
    <Card className="p-2">
      <h1>Flame Graphs</h1>
      <p>
        Flame graphing is a visualization concept useful for hierarchical time
        or frequency based data, such as the output of common application
        performance tracing tools, including <code>dtrace</code> or{' '}
        <code>perf</code>. Please check out{' '}
        <a href="https://www.brendangregg.com/flamegraphs.html">
          Brendan Gregg&apos;s website
        </a>{' '}
        for in-depth information on their use cases, generation, and analysis.
      </p>
      <p>
        INFERNOde is intended to make the process of performance tracing Node.JS
        applications in order to generate flame graphs significantly easier. The{' '}
        <Link to="/capture">Capture page</Link> can coordinate running and
        sampling your app with <code>perf</code>
        (on Linux) or <code>dtrace</code> (on MacOS), and will automatically
        generate flame or ice graphs for all captured traces.
      </p>
      <p>
        If you are already familiar with capturing performance traces or need to
        perform the capture process in an isolated environment, you can upload
        Linux perf formatted capture files to the{' '}
        <Link to="/upload">Upload page</Link>. Perf files will then be
        automatically folded and converted into interactive flame or ice graph
        SVGs.
      </p>
    </Card>
  );
}

export function HelpPerf(): JSX.Element {
  return (
    <Card className="p-2">
      <h1>Linux perf Profiling</h1>
      <p>
        Performance tracing on modern Linux distributions is performed with the{' '}
        <a href="https://perf.wiki.kernel.org/index.php/Main_Page">
          perf framework
        </a>{' '}
        . By default, the Linux kernel prevents unprivileged users from
        monitoring low level system performance. In order to permit non-root
        users (such as your personal user account running INFERNOde) to capture
        this data, you will need to change some sysctl settings. We recommend
        only making this change on single-user development workstations, NOT on
        production or shared systems.
        <Card className="shadow-sm p-2 mt-2">
          <code>
            echo &quot;kernel.perf_event_paranoid=-1&quot; | sudo tee -a
            /etc/sysctl.conf &gt; /dev/null
            <br />
            sysctl -p
          </code>
        </Card>
      </p>
    </Card>
  );
}
export function HelpDtrace(): JSX.Element {
  return (
    <Card className="p-2">
      <h1>MacOS dtrace Profiling</h1>
      <p>
        Performance tracing on MacOS is handled with <code>dtrace</code>, a
        framework originally developed for Solaris. Due to the potential for
        malicious abuse, using dtrace requires elevated privileges, and
        you&apos;ll need to adjust your <code>sudo</code> configuration in order
        to allow INFERNOde to manage performance tracing on your behalf.
        <Card className="shadow-sm p-2 mt-2">
          <code>
            echo &quot;$(whoami) ALL=(ALL) NOPASSWD: /usr/sbin/dtrace&quot; |
            sudo tee -a /etc/sudoers
          </code>
        </Card>
      </p>
    </Card>
  );
}
